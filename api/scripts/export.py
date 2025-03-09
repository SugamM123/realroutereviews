import sys
from pathlib import Path
import os
import psycopg2
from psycopg2.extras import RealDictCursor

# Add the parent directory to the path so we can import from the api package
api_dir = Path(__file__).parent.parent
sys.path.append(str(api_dir))

# Import your existing functions
from database.connection import init_db

def get_db():
    """Get a database connection using current environment variables."""
    return psycopg2.connect(
        dbname=os.environ.get("DB_NAME", "rrr"),
        user=os.environ.get("DB_USER", "sugammishra"),
        password=os.environ.get("DB_PASSWORD", ""),
        host=os.environ.get("DB_HOST", "localhost"),
        port=os.environ.get("DB_PORT", "5432"),
        cursor_factory=RealDictCursor
    )

def seed_routes_fixed():
    """Seed the routes table with sample data."""
    conn = get_db()
    cur = conn.cursor()
    
    # First, check if routes already exist
    cur.execute("SELECT COUNT(*) FROM routes")
    count = cur.fetchone()['count']
    
    if count > 0:
        print(f"Routes table already has {count} records. Skipping route seeding.")
        conn.close()
        return
    
    # Sample routes data - copy this from your seed_data.py
    routes = [
        {
            "id": "01",
            "name": "Bonfire",
            "description": "Route serving main campus and northside residence halls",
            "stops": ["MSC", "Kleberg", "Northside Halls", "Kyle Field"],
            "schedule": "Weekdays: 7am-10pm, Every 15 minutes"
        },
        {
            "id": "03",
            "name": "Yell Practice",
            "description": "Route serving west campus and research park",
            "stops": ["MSC", "West Campus", "Research Park", "Easterwood"],
            "schedule": "Weekdays: 7am-7pm, Every 20 minutes"
        },
        {
            "id": "04",
            "name": "Gig Em",
            "description": "Route serving main campus and southside residence halls",
            "stops": ["MSC", "Academic Plaza", "Southside Halls", "Reed Arena"],
            "schedule": "Weekdays: 7am-10pm, Every 15 minutes"
        },
        {
            "id": "05",
            "name": "Bush School",
            "description": "Route serving Bush School and surrounding areas",
            "stops": ["MSC", "Bush School", "Allen Building", "Park West"],
            "schedule": "Weekdays: 8am-6pm, Every 30 minutes"
        },
        {
            "id": "12",
            "name": "Reveille",
            "description": "Express route between northside and main campus",
            "stops": ["Northside Halls", "MSC", "Kyle Field"],
            "schedule": "Weekdays: 7am-7pm, Every 10 minutes"
        },
        {
            "id": "15",
            "name": "Old Army",
            "description": "Route serving Corps of Cadets areas",
            "stops": ["Quad", "Military Walk", "MSC", "Kyle Field"],
            "schedule": "Weekdays: 7am-7pm, Every 15 minutes"
        },
        {
            "id": "22",
            "name": "Century Tree",
            "description": "Route serving central campus locations",
            "stops": ["MSC", "Evans Library", "Academic Plaza", "YMCA Building"],
            "schedule": "Weekdays: 7am-10pm, Every 10 minutes"
        },
        {
            "id": "26",
            "name": "Rudder",
            "description": "Route serving east campus and veterinary school",
            "stops": ["MSC", "Vet School", "East Campus", "Research Park"],
            "schedule": "Weekdays: 7am-7pm, Every 20 minutes"
        },
        {
            "id": "31",
            "name": "Howdy",
            "description": "Route serving off-campus student housing",
            "stops": ["The Rise", "The Stack", "Z Islander", "Campus"],
            "schedule": "Weekdays: 7am-10pm, Every 15 minutes"
        },
        {
            "id": "36",
            "name": "Hullabaloo",
            "description": "Route serving Northgate and surrounding areas",
            "stops": ["Northgate", "MSC", "Kyle Field", "Reed Arena"],
            "schedule": "Weekdays: 7am-2am, Every 15 minutes"
        },
        {
            "id": "47",
            "name": "RELLIS",
            "description": "Route between main campus and RELLIS campus",
            "stops": ["MSC", "RELLIS Campus"],
            "schedule": "Weekdays: 7am-7pm, Every 30 minutes"
        },
        {
            "id": "48",
            "name": "RELLIS Circulator",
            "description": "Circulator route within RELLIS campus",
            "stops": ["RELLIS Main", "RELLIS Research", "RELLIS Academic", "RELLIS Testing"],
            "schedule": "Weekdays: 8am-6pm, Every 15 minutes"
        },
        {
            "id": "01-04",
            "name": "Bonfire & Gig 'em",
            "description": "Combined route serving both north and south campus",
            "stops": ["Northside Halls", "MSC", "Southside Halls", "Kyle Field"],
            "schedule": "Weekends: 10am-8pm, Every 30 minutes"
        },
        {
            "id": "03-05",
            "name": "Yell Practice & Bush School",
            "description": "Combined route serving west campus and Bush School",
            "stops": ["MSC", "West Campus", "Bush School", "Research Park"],
            "schedule": "Weekends: 10am-6pm, Every 30 minutes"
        }
    ]
    
    # Insert routes
    print("Adding routes...")
    for route in routes:
        try:
            cur.execute('''
                INSERT INTO routes (id, name, description, stops, schedule)
                VALUES (%s, %s, %s, %s, %s)
            ''', (route["id"], route["name"], route["description"], 
                 psycopg2.extras.Json(route["stops"]), route["schedule"]))
            print(f"Added route {route['id']}: {route['name']}")
            conn.commit()
        except Exception as e:
            conn.rollback()
            print(f"Error adding route: {e}")
    
    conn.close()

def seed_reviews_fixed():
    """Seed the reviews table with sample data, skipping reviews for non-existent routes."""
    conn = get_db()
    cur = conn.cursor()
    
    # First, check if reviews already exist
    cur.execute("SELECT COUNT(*) FROM reviews")
    count = cur.fetchone()['count']
    
    if count > 0:
        print(f"Reviews table already has {count} records. Skipping review seeding.")
        conn.close()
        return
    
    # Get list of existing route IDs
    cur.execute("SELECT id FROM routes")
    existing_routes = [row['id'] for row in cur.fetchall()]
    print(f"Existing routes: {existing_routes}")
    
    # Sample reviews data - copy this from your seed_data.py
    reviews = [
        {"route_id": "01", "rating": 5, "comment": "Great route, always on time!", "user_name": "John Aggie"},
        {"route_id": "01", "rating": 4, "comment": "Reliable and clean buses.", "user_name": "Sarah Student"},
        {"route_id": "02", "rating": 3, "comment": "Sometimes late during peak hours.", "user_name": "Mike Engineer"},
        {"route_id": "03", "rating": 5, "comment": "Perfect for getting to west campus quickly.", "user_name": "Lisa Grad"},
        {"route_id": "04", "rating": 4, "comment": "Good service to southside.", "user_name": "Tom Junior"},
        {"route_id": "05", "rating": 5, "comment": "Makes getting to Bush School easy.", "user_name": "Policy Student"},
        {"route_id": "12", "rating": 5, "comment": "Fast and frequent service!", "user_name": "Northside Resident"},
        {"route_id": "15", "rating": 4, "comment": "Great for Corps activities.", "user_name": "Cadet Jones"},
        {"route_id": "22", "rating": 5, "comment": "Best route for central campus.", "user_name": "Library Lover"},
        {"route_id": "26", "rating": 3, "comment": "Wish it ran more frequently.", "user_name": "Vet Student"}
    ]
    
    # Filter reviews to only include those for existing routes
    valid_reviews = [review for review in reviews if review["route_id"] in existing_routes]
    
    # Insert valid reviews
    print("\nAdding reviews...")
    for review in valid_reviews:
        try:
            cur.execute('''
                INSERT INTO reviews (route_id, rating, comment, user_name)
                VALUES (%s, %s, %s, %s)
            ''', (review["route_id"], review["rating"], review["comment"], review["user_name"]))
            print(f"Added review for route {review['route_id']} by {review['user_name']}")
            conn.commit()
        except Exception as e:
            conn.rollback()
            print(f"Error adding review: {e}")
    
    conn.close()

def setup_neon_db():
    """Set up the Neon DB by dropping existing tables, initializing structure, and seeding data."""
    # Neon DB connection parameters
    DB_NAME = "neondb"
    DB_USER = "neondb_owner"
    DB_PASSWORD = "npg_HfSoiV2l8gAF"  # Be careful with passwords in code
    DB_HOST = "ep-yellow-bar-a5htbtp4-pooler.us-east-2.aws.neon.tech"
    DB_PORT = "5432"
    
    # Store original environment variables
    original_db_name = os.environ.get("DB_NAME")
    original_db_user = os.environ.get("DB_USER")
    original_db_password = os.environ.get("DB_PASSWORD")
    original_db_host = os.environ.get("DB_HOST")
    original_db_port = os.environ.get("DB_PORT")
    
    try:
        # Set environment variables for Neon DB
        os.environ["DB_NAME"] = DB_NAME
        os.environ["DB_USER"] = DB_USER
        os.environ["DB_PASSWORD"] = DB_PASSWORD
        os.environ["DB_HOST"] = DB_HOST
        os.environ["DB_PORT"] = DB_PORT
        
        # Connect to Neon DB
        print("Connecting to Neon DB...")
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            cursor_factory=RealDictCursor
        )
        cur = conn.cursor()
        
        # Drop existing tables if they exist
        print("Dropping existing tables...")
        cur.execute("DROP TABLE IF EXISTS reviews CASCADE")
        cur.execute("DROP TABLE IF EXISTS routes CASCADE")
        conn.commit()
        conn.close()
        
        # Initialize the database structure
        print("Initializing database structure...")
        init_db()
        
        # Seed the database with data
        print("Seeding database with data...")
        seed_routes_fixed()  # Add routes first
        seed_reviews_fixed()  # Add reviews with the fixed function
        
        print("Successfully exported local database to Neon DB!")
        
    except Exception as e:
        print(f"Error exporting to Neon DB: {e}")
        raise
    finally:
        # Restore original environment variables
        if original_db_name:
            os.environ["DB_NAME"] = original_db_name
        if original_db_user:
            os.environ["DB_USER"] = original_db_user
        if original_db_password:
            os.environ["DB_PASSWORD"] = original_db_password
        if original_db_host:
            os.environ["DB_HOST"] = original_db_host
        if original_db_port:
            os.environ["DB_PORT"] = original_db_port

if __name__ == "__main__":
    setup_neon_db()