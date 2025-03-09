import sys
import json
from pathlib import Path
import datetime

# Add the parent directory to the path so we can import from the api package
api_dir = Path(__file__).parent.parent
sys.path.append(str(api_dir))

from database.connection import get_db, init_db

def seed_database():
    # Initialize the database first
    init_db()
    
    conn = get_db()
    cur = conn.cursor()
    
    # Check if routes already exist
    cur.execute("SELECT COUNT(*) FROM routes")
    count = cur.fetchone()['count']
    
    if count > 0:
        print("Database already has routes. Skipping route creation.")
        conn.close()
        return
    
    # Texas A&M bus routes data
    routes = [
        {
            "id": "01",
            "name": "Bonfire",
            "description": "Serves the Northside of campus and College Main area",
            "stops": json.dumps([
                "MSC", "Kleberg", "Lot 30", "College Main", "The Gardens"
            ]),
            "schedule": "Weekdays: 7:00 AM - 6:00 PM, Every 10 minutes"
        },
        {
            "id": "02",
            "name": "Reveille",
            "description": "Serves the Southside of campus and Southgate area",
            "stops": json.dumps([
                "MSC", "Kyle Field", "Reed Arena", "Southgate", "Olsen Field"
            ]),
            "schedule": "Weekdays: 7:00 AM - 6:00 PM, Every 10 minutes"
        },
        {
            "id": "03",
            "name": "Gig 'Em",
            "description": "Serves West Campus and Research Park",
            "stops": json.dumps([
                "MSC", "West Campus Library", "Research Park", "Easterwood Airport", "Bush School"
            ]),
            "schedule": "Weekdays: 7:00 AM - 6:00 PM, Every 15 minutes"
        },
        {
            "id": "04",
            "name": "Hullabaloo",
            "description": "Express route between Northgate and main campus",
            "stops": json.dumps([
                "Northgate", "MSC", "Kyle Field", "Evans Library"
            ]),
            "schedule": "Weekdays: 7:00 AM - 10:00 PM, Every 5 minutes"
        },
        {
            "id": "12",
            "name": "Reveille Express",
            "description": "Express route serving key locations on Southside",
            "stops": json.dumps([
                "MSC", "Kyle Field", "Reed Arena", "Southgate"
            ]),
            "schedule": "Weekdays: 7:00 AM - 6:00 PM, Every 7 minutes"
        },
        {
            "id": "15",
            "name": "Old Army",
            "description": "Serves off-campus student housing areas",
            "stops": json.dumps([
                "MSC", "The Tradition", "Park West", "Campus Village", "The Rise"
            ]),
            "schedule": "Weekdays: 7:00 AM - 10:00 PM, Every 15 minutes"
        },
        {
            "id": "22",
            "name": "Century Tree",
            "description": "Circular route around main campus",
            "stops": json.dumps([
                "MSC", "Evans Library", "Academic Building", "Kyle Field", "Zachry Engineering"
            ]),
            "schedule": "Weekdays: 7:00 AM - 6:00 PM, Every 10 minutes"
        },
        {
            "id": "26",
            "name": "Aggie Spirit",
            "description": "Serves apartment complexes along Texas Avenue",
            "stops": json.dumps([
                "MSC", "Texas Avenue", "HEB", "Post Oak Mall", "Walmart"
            ]),
            "schedule": "Weekdays: 7:00 AM - 10:00 PM, Every 20 minutes"
        },
        {
            "id": "31",
            "name": "Howdy",
            "description": "Serves the far north apartment complexes",
            "stops": json.dumps([
                "MSC", "Northpoint Crossing", "The Stack", "Callaway House", "Northgate"
            ]),
            "schedule": "Weekdays: 7:00 AM - 10:00 PM, Every 15 minutes"
        },
        {
            "id": "01-04",
            "name": "Bonfire-Hullabaloo Combo",
            "description": "Combined route serving both Bonfire and Hullabaloo areas",
            "stops": json.dumps([
                "MSC", "Kleberg", "Lot 30", "College Main", "The Gardens", "Northgate", "Kyle Field", "Evans Library"
            ]),
            "schedule": "Weekends: 10:00 AM - 6:00 PM, Every 20 minutes"
        }
    ]
    
    # Insert routes
    print("Adding routes...")
    for route in routes:
        try:
            cur.execute("""
                INSERT INTO routes (id, name, description, stops, schedule)
                VALUES (%s, %s, %s, %s, %s)
            """, (
                route["id"],
                route["name"],
                route["description"],
                route["stops"],
                route["schedule"]
            ))
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
        },
        {
            "route_id": "04",
            "rating": 5,
            "comment": "Super fast and convenient!",
            "user_name": "Tom Grad"
        },
        {
            "route_id": "12",
            "rating": 4,
            "comment": "Great for getting to Reed Arena quickly",
            "user_name": "Basketball Fan"
        },
        {
            "route_id": "15",
            "rating": 2,
            "comment": "Often late during peak hours",
            "user_name": "Frustrated Junior"
        },
        {
            "route_id": "22",
            "rating": 5,
            "comment": "Perfect for getting around campus between classes",
            "user_name": "Busy Student"
        },
        {
            "route_id": "26",
            "rating": 3,
            "comment": "Good for grocery runs but infrequent",
            "user_name": "Off-Campus Resident"
        },
        {
            "route_id": "31",
            "rating": 4,
            "comment": "Reliable service to north apartments",
            "user_name": "Apartment Dweller"
        },
        {
            "route_id": "01-04",
            "rating": 4,
            "comment": "Great weekend option when other routes aren't running",
            "user_name": "Weekend Warrior"
        }
    ]
    
    print("\nAdding reviews...")
    for review in reviews:
        try:
            cur.execute("""
                INSERT INTO reviews (route_id, rating, comment, user_name)
                VALUES (%s, %s, %s, %s)
            """, (
                review["route_id"],
                review["rating"],
                review["comment"],
                review["user_name"]
            ))
            print(f"Added review for route {review['route_id']} by {review['user_name']}")
        except Exception as e:
            print(f"Error adding review: {e}")
    
    conn.commit()
    conn.close()
    print("\nDatabase seeding completed successfully!")

if __name__ == "__main__":
    seed_database()