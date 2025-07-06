import os
import datetime
import jwt
import psycopg2
from psycopg2.extras import RealDictCursor
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv

# --- Initialization ---
load_dotenv() # Load environment variables from .env file

app = Flask(__name__)
CORS(app)

# --- Configuration ---
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
bcrypt = Bcrypt(app)

# --- Database Connection Helper (Optional but Recommended) ---
# For simplicity, connection is handled in each route as per your original file.
# A helper function can reduce code duplication.
def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        database=os.getenv('DB_NAME', 'metriks'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', 'password')
    )
    return conn

# ==============================================================================
# --- NEW AUTHENTICATION ENDPOINTS ---
# ==============================================================================

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password') or not data.get('username'):
        return jsonify({'message': 'Missing data. Email, username, and password are required.'}), 400

    email = data['email']
    username = data['username']
    password = data['password']
    
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if user already exists
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        if cursor.fetchone():
            return jsonify({'message': 'An account with this email already exists.'}), 409 # 409 Conflict

        # Hash the password and store the new user
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        cursor.execute(
            'INSERT INTO users (email, username, passwordhash) VALUES (%s, %s, %s)',
            (email, username, password_hash)
        )
        conn.commit()
        
        return jsonify({'message': 'User registered successfully!'}), 201 # 201 Created
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password.'}), 400

    email = data['email']
    password = data['password']

    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        # Use RealDictCursor to access columns by name (e.g., user['passwordhash'])
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cursor.fetchone()

        if user and bcrypt.check_password_hash(user['passwordhash'], password):
            # Password is correct, create a token
            token = jwt.encode({
                'userid': user['userid'],
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=30)
            }, app.config['SECRET_KEY'], algorithm='HS256')
            
            return jsonify({'token': token, 'username': user['username']})
        
        # Unauthorized
        return jsonify({'message': 'Invalid credentials. Please try again.'}), 401
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# ==============================================================================
# --- EXISTING API ENDPOINTS ---
# ==============================================================================

@app.route('/api/search/supermarket', methods=['GET'])
def search_supermarket():
    query = request.args.get('q', '') # Changed to 'q' to match frontend standard
    searchType = request.args.get('searchType', 'master')
    limit = int(request.args.get('limit', 20))
    page = int(request.args.get('page', 1)) # Added page for pagination
    offset = (page - 1) * limit
    
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400
    
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        # Using RealDictCursor here simplifies formatting the response
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if searchType == 'master':
            search_term_exact = query
            search_term_starts_with = f"{query}%"
            search_term_contains = f"%{query}%"
            
            sql_query = """
            WITH RankedListings AS (
                SELECT
                    p.masterproductid, p.productname, p.imageurl, pr.price,
                    s.storename, r.retailername, l.listingid, p.brand,
                    ROW_NUMBER() OVER(PARTITION BY p.masterproductid ORDER BY pr.price ASC) as price_rank
                FROM products p
                JOIN retailerproductlistings l ON p.masterproductid = l.masterproductid
                JOIN prices pr ON l.listingid = pr.listingid
                JOIN stores s ON l.storeid = s.storeid
                JOIN retailers r ON l.retailerid = r.retailerid
                WHERE p.productname ILIKE %s AND pr.iscurrent = TRUE
            )
            SELECT * FROM RankedListings
            WHERE price_rank = 1
            ORDER BY
                CASE
                    WHEN productname ILIKE %s THEN 0
                    WHEN productname ILIKE %s THEN 1
                    ELSE 2
                END, price ASC
            LIMIT %s OFFSET %s;
            """
            
            params = (
                search_term_contains, search_term_exact, search_term_starts_with,
                limit, offset
            )
            
            cursor.execute(sql_query, params)
            results = cursor.fetchall()
            
            # RealDictCursor returns a list of dictionaries, so we can return it directly
            return jsonify(results)
            
        elif searchType == 'nearby':
            # Placeholder for nearby search logic
            return jsonify({"message": "Nearby search not implemented yet"}), 501
        
        else:
            return jsonify({"error": "Invalid searchType. Use 'master' or 'nearby'"}), 400
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/api/hahishuk/prepare-cart-url', methods=['POST'])
def prepare_cart_url():
    items = request.json.get("items", [])
    
    if not items:
        return jsonify({"error": "No items provided"}), 400
    
    # This implementation is simplified and only handles one item
    item = items[0]
    product_id = item.get('productId')
    quantity = item.get('quantity', 1)
    
    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400
    
    redirect_url = f"https://hahishook.com/cart/?add-to-cart={product_id}&quantity={quantity}"
    
    return jsonify({
        "redirectUrl": redirect_url,
        "summary": f"Adding item {product_id} (quantity: {quantity}) to Hahishuk cart"
    })

@app.route('/api/products/hahishuk', methods=['GET'])
def get_hahishuk_products():
    # Mock product data for now
    products = [
        {"productname": "Milk 3%", "hahishuk_site_product_id": "15164", "imageurl": "https://hahishook.com/product-image.jpg", "current_price": 5.90, "stock_status": "instock"},
        {"productname": "White Bread", "hahishuk_site_product_id": "15165", "imageurl": "https://hahishook.com/bread-image.jpg", "current_price": 7.50, "stock_status": "instock"},
        {"productname": "Eggs 12 Pack", "hahishuk_site_product_id": "15166", "imageurl": "https://hahishook.com/eggs-image.jpg", "current_price": 12.90, "stock_status": "instock"}
    ]
    return jsonify(products)

if __name__ == '__main__':
    # Use port 5000 as a standard, or 5001 if you prefer
    app.run(debug=True, host='0.0.0.0', port=5000)