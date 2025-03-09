import sys
from pathlib import Path
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import json  # Import json to use json.dumps

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
    
    # Sample routes data
    routes = [
        {
            "id": "01",
            "name": "Bonfire",
            "description": "On-campus route serving main campus areas",
            "stops": json.dumps(["MSC", "Sbisa", "West Campus", "Main Campus"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "03",
            "name": "Yell Practice",
            "description": "On-campus route serving academic areas",
            "stops": json.dumps(["MSC", "Academic Plaza", "Main Campus"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "04",
            "name": "Gig Em",
            "description": "On-campus route serving west campus areas",
            "stops": json.dumps(["MSC", "West Campus", "Engineering Buildings"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "05",
            "name": "Bush School",
            "description": "On-campus route serving Bush School and surrounding areas",
            "stops": json.dumps(["MSC", "Bush School", "Research Park"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "06",
            "name": "12th Man",
            "description": "On-campus route serving athletic facilities",
            "stops": json.dumps(["MSC", "Kyle Field", "Athletic Facilities"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "07",
            "name": "Airport",
            "description": "On-campus route serving Easterwood Airport",
            "stops": json.dumps(["MSC", "Easterwood Airport", "Research Park"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "08",
            "name": "Howdy",
            "description": "On-campus route serving central campus areas",
            "stops": json.dumps(["MSC", "Central Campus", "Student Services"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "12",
            "name": "Reveille",
            "description": "Off-campus route serving nearby residential areas",
            "stops": json.dumps(["MSC", "Off-campus Housing", "Northgate"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "15",
            "name": "Old Army",
            "description": "Off-campus route serving residential areas",
            "stops": json.dumps(["MSC", "Off-campus Housing", "Apartments"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "22",
            "name": "Excel",
            "description": "Off-campus route serving south College Station",
            "stops": json.dumps(["MSC", "South College Station", "Apartments"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "26",
            "name": "Rudder",
            "description": "Off-campus route serving east College Station",
            "stops": json.dumps(["MSC", "East College Station", "Apartments"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "27",
            "name": "Ring Dance",
            "description": "Off-campus route serving residential areas",
            "stops": json.dumps(["MSC", "Off-campus Housing", "Shopping Areas"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "31",
            "name": "Elephant Walk",
            "description": "Off-campus route serving southwest College Station",
            "stops": json.dumps(["MSC", "Southwest College Station", "Apartments"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "34",
            "name": "Fish Camp",
            "description": "Off-campus route serving residential areas",
            "stops": json.dumps(["MSC", "Off-campus Housing", "Apartments"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "35",
            "name": "Hullabaloo",
            "description": "Off-campus route serving popular student housing",
            "stops": json.dumps(["MSC", "Student Apartments", "Northgate"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "36",
            "name": "Matthew Gaines",
            "description": "Off-campus route serving residential areas",
            "stops": json.dumps(["MSC", "Off-campus Housing", "Apartments"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "40",
            "name": "Century Tree",
            "description": "Off-campus route serving residential areas",
            "stops": json.dumps(["MSC", "Off-campus Housing", "Apartments"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "47",
            "name": "RELLIS",
            "description": "Off-campus route serving RELLIS Campus",
            "stops": json.dumps(["MSC", "RELLIS Campus", "Research Facilities"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "48",
            "name": "RELLIS Circulator",
            "description": "Off-campus route circulating within RELLIS Campus",
            "stops": json.dumps(["RELLIS Campus Buildings", "Research Facilities", "Academic Buildings"]),
            "schedule": "Weekdays: Regular service with map and times available"
        },
        {
            "id": "01-04",
            "name": "Bonfire-Gig Em Nights & Weekends",
            "description": "Combined night and weekend route",
            "stops": json.dumps(["MSC", "Main Campus", "West Campus", "Engineering Buildings"]),
            "schedule": "Nights & Weekends: Combined service with reduced frequency"
        },
        {
            "id": "03-05",
            "name": "Yell Practice-Bush School Nights & Weekends",
            "description": "Combined night and weekend route",
            "stops": json.dumps(["MSC", "Academic Plaza", "Bush School", "Research Park"]),
            "schedule": "Nights & Weekends: Combined service with reduced frequency"
        },
        {
            "id": "15-35",
            "name": "Old Army-Hullabaloo Nights & Weekends",
            "description": "Combined night and weekend route",
            "stops": json.dumps(["MSC", "Off-campus Housing", "Student Apartments", "Northgate"]),
            "schedule": "Nights & Weekends: Combined service with reduced frequency"
        },
        {
            "id": "22-27",
            "name": "Excel-Ring Dance Nights & Weekends",
            "description": "Combined night and weekend route",
            "stops": json.dumps(["MSC", "South College Station", "Off-campus Housing", "Shopping Areas"]),
            "schedule": "Nights & Weekends: Combined service with reduced frequency"
        },
        {
            "id": "26-31",
            "name": "Rudder-Elephant Walk Nights & Weekends",
            "description": "Combined night and weekend route",
            "stops": json.dumps(["MSC", "East College Station", "Southwest College Station", "Apartments"]),
            "schedule": "Nights & Weekends: Combined service with reduced frequency"
        },
        {
            "id": "47-48",
            "name": "RELLIS-RELLIS Circulator Nights & Weekends",
            "description": "Combined night and weekend route for RELLIS Campus",
            "stops": json.dumps(["MSC", "RELLIS Campus", "Research Facilities", "Academic Buildings"]),
            "schedule": "Nights & Weekends: Combined service with reduced frequency"
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