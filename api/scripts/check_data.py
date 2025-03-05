import sys
from pathlib import Path
api_dir = Path(__file__).parent.parent
sys.path.append(str(api_dir))

from database.connection import get_db

def check_database():
    conn = get_db()
    cur = conn.cursor()
    
    print("Checking Routes:")
    cur.execute("SELECT * FROM routes")
    routes = cur.fetchall()
    for route in routes:
        print(f"\nRoute ID: {route['id']}")
        print(f"Name: {route['name']}")
        print(f"Stops: {route['stops']}")
        print(f"Schedule: {route['schedule']}")
        
        # Get reviews for this route
        cur.execute("""
            SELECT * FROM reviews 
            WHERE route_id = ? 
            ORDER BY created_at DESC
        """, (route['id'],))
        reviews = cur.fetchall()
        print(f"\nReviews ({len(reviews)}):")
        for review in reviews:
            print(f"- {review['rating']}/5 by {review['user_name']}: {review['comment']}")
        print("-" * 50)

    conn.close()

if __name__ == "__main__":
    check_database()