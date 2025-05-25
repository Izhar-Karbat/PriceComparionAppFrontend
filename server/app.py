from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/hahishuk/prepare-cart-url', methods=['POST'])
def prepare_cart_url():
    items = request.json.get("items", [])
    
    if not items or len(items) == 0:
        return jsonify({"error": "No items provided"}), 400
    
    # For now, we'll build the Hahishuk add-to-cart URL
    # Each item should have productId and quantity
    item = items[0]  # Process one item at a time
    product_id = item.get('productId')
    quantity = item.get('quantity', 1)
    
    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400
    
    # Construct Hahishuk add-to-cart URL
    redirect_url = f"https://hahishook.com/cart/?add-to-cart={product_id}&quantity={quantity}"
    
    return jsonify({
        "redirectUrl": redirect_url,
        "summary": f"Adding item {product_id} (quantity: {quantity}) to Hahishuk cart"
    })

@app.route('/api/products/hahishuk', methods=['GET'])
def get_hahishuk_products():
    # Mock product data for now
    # In production, this would query your database
    products = [
        {
            "productname": "Milk 3%",
            "hahishuk_site_product_id": "15164",
            "imageurl": "https://hahishook.com/product-image.jpg",
            "current_price": 5.90,
            "stock_status": "instock"
        },
        {
            "productname": "White Bread",
            "hahishuk_site_product_id": "15165",
            "imageurl": "https://hahishook.com/bread-image.jpg",
            "current_price": 7.50,
            "stock_status": "instock"
        },
        {
            "productname": "Eggs 12 Pack",
            "hahishuk_site_product_id": "15166",
            "imageurl": "https://hahishook.com/eggs-image.jpg",
            "current_price": 12.90,
            "stock_status": "instock"
        }
    ]
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
