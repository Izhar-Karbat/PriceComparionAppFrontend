import requests

BASE_URL = "https://hahishook.com"
ADD_TO_CART_URL = f"{BASE_URL}/?wc-ajax=add_to_cart"

# Mock function to look up product_id from your DB
def get_product_id_by_name(name):
    # TODO: Replace with real DB lookup
    mapping = {
        "אורז בסמטי": "178225",
        "קמח דורום": "190077"
    }
    return mapping.get(name)

def add_items_to_hahishook_cart(item_names):
    session = requests.Session()
    results = []

    for name in item_names:
        product_id = get_product_id_by_name(name)
        if not product_id:
            results.append({ "name": name, "status": "not_found" })
            continue

        payload = {
            'product_id': product_id,
            'quantity': 1
        }

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': BASE_URL,
        }

        r = session.post(ADD_TO_CART_URL, headers=headers, data=payload)

        if r.status_code == 200 and '"success":true' in r.text:
            results.append({ "name": name, "status": "added" })
        else:
            results.append({ "name": name, "status": "error", "details": r.text[:100] })

    return {
        "summary": f"Added {len([r for r in results if r['status'] == 'added'])}/{len(item_names)} items",
        "details": results
    }
