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
            "description": "Servicing the MSC, Sbisa Dining Hall, West Campus Garage, and Reed Arena",
            "stops": json.dumps([
                "MSC", "Sbisa Dining Hall", "West Campus Garage", "Reed Arena", "Bizzell Street"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM, Night Service until midnight"
        },
        {
            "id": "03",
            "name": "Yell Practice",
            "description": "Servicing the MSC, School of Public Health, and School of Veterinary Medicine",
            "stops": json.dumps([
                "MSC", "School of Public Health", "School of Veterinary Medicine"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM, Night Service until midnight"
        },
        {
            "id": "04",
            "name": "Gig Em",
            "description": "Servicing Asbury St, Zachry, and The Gardens",
            "stops": json.dumps([
                "Asbury St", "Zachry", "The Gardens"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM, Night Service until midnight"
        },
        {
            "id": "05",
            "name": "Bush School",
            "description": "Servicing ILCB, Reed Arena, Bush School, and Technology Loop",
            "stops": json.dumps([
                "ILCB", "Reed Arena", "Bush School", "Technology Loop"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM, Night Service until midnight"
        },
        {
            "id": "12",
            "name": "Reveille",
            "description": "Servicing Blinn College",
            "stops": json.dumps([
                "Blinn College"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM"
        },
        {
            "id": "15",
            "name": "Old Army",
            "description": "Servicing Midtown Park in Bryan",
            "stops": json.dumps([
                "Midtown Park in Bryan"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM, Night Service until midnight"
        },
        {
            "id": "22",
            "name": "Century Tree",
            "description": "Servicing Southwest College Station extending to The Barracks",
            "stops": json.dumps([
                "Southwest College Station", "The Barracks"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM, Night Service until midnight"
        },
        {
            "id": "26",
            "name": "Rudder",
            "description": "Servicing East College Station extending to Wolf Pen Creek",
            "stops": json.dumps([
                "East College Station", "Wolf Pen Creek", "Anderson St"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM, Night Service until midnight"
        },
        {
            "id": "31",
            "name": "Howdy",
            "description": "Servicing WCG, the Rec, and Park West",
            "stops": json.dumps([
                "West Campus Garage", "The Rec", "Park West"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM, Night Service until midnight"
        },
        {
            "id": "36",
            "name": "Hullabaloo",
            "description": "Servicing Southwest College Station extending to University Trails",
            "stops": json.dumps([
                "Southwest College Station", "University Trails"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM, Night Service until midnight"
        },
        {
            "id": "47",
            "name": "RELLIS",
            "description": "Servicing RELLIS campus and the Health Science Center",
            "stops": json.dumps([
                "RELLIS campus", "Health Science Center", "Blinn/RELLIS stop"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM"
        },
        {
            "id": "48",
            "name": "RELLIS Circulator",
            "description": "A circular route servicing only RELLIS campus",
            "stops": json.dumps([
                "RELLIS campus"
            ]),
            "schedule": "Fall & Spring: Weekdays 7:00 AM - 7:00 PM"
        },
        {
            "id": "01-04",
            "name": "Bonfire & Gig 'em",
            "description": "Night service combination route",
            "stops": json.dumps([
                "MSC", "Sbisa Dining Hall", "West Campus Garage", "Reed Arena", "Asbury St", "Zachry", "The Gardens"
            ]),
            "schedule": "Night Service: 7:00 PM - midnight"
        },
        {
            "id": "03-05",
            "name": "Yell Practice & Bush School",
            "description": "Night service combination route",
            "stops": json.dumps([
                "MSC", "School of Public Health", "School of Veterinary Medicine", "ILCB", "Reed Arena", "Bush School", "Technology Loop"
            ]),
            "schedule": "Night Service: 7:00 PM - midnight"
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