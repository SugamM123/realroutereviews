import sys
from pathlib import Path

# Add the parent directory to Python path so we can import our modules
api_dir = Path(__file__).parent.parent
sys.path.append(str(api_dir))

from database.connection import init_db
from database.operations import add_route, create_review

def seed_database():
    # Initialize the database first
    init_db()
    
    # TAMU bus routes data
    routes = [
        {
            "id": "01-04",
            "name": "Bonfire Express",
            "stops": ["MSC", "Kleberg", "Reed Arena", "Commons"],
            "schedule": "Mon-Fri 7AM-7PM"
        },
        {
            "id": "02A",
            "name": "Transport Plus",
            "stops": ["Park West", "MSC", "Fish Pond", "Kyle Field"],
            "schedule": "Mon-Fri 8AM-6PM"
        },
        {
            "id": "03",
            "name": "Campus Connector",
            "stops": ["West Campus Garage", "MSC", "Evans Library", "Zachry"],
            "schedule": "Mon-Fri 7:30AM-5:30PM"
        }
    ]
    
    # Add routes
    print("Adding routes...")
    for route in routes:
        try:
            add_route(route["id"], route["name"], route["stops"], route["schedule"])
            print(f"Added route {route['id']}: {route['name']}")
        except Exception as e:
            print(f"Error adding route {route['id']}: {e}")
    
    # Add some sample reviews
    reviews = [
        {
            "route_id": "01",
            "rating": 5,
            "comment": "Always on time, great service!",
            "user_name": "John Aggie"
        },
        {
            "route_id": "01",
            "rating": 4,
            "comment": "Reliable but sometimes crowded",
            "user_name": "Sarah Student"
        },
        {
            "route_id": "02",
            "rating": 5,
            "comment": "Best route to get to class",
            "user_name": "Mike Senior"
        },
        {
            "route_id": "03",
            "rating": 3,
            "comment": "Decent but could be more frequent",
            "user_name": "Lisa Freshman"
        }
    ]
    
    print("\nAdding reviews...")
    for review in reviews:
        try:
            create_review(
                review["route_id"],
                review["rating"],
                review["comment"],
                review["user_name"]
            )
            print(f"Added review for route {review['route_id']} by {review['user_name']}")
        except Exception as e:
            print(f"Error adding review: {e}")

if __name__ == "__main__":
    print("Starting database seeding...")
    seed_database()
    print("\nSeeding completed!")