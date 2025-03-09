import sys
from pathlib import Path

# Add the parent directory to the path so we can import from the api package
api_dir = Path(__file__).parent.parent
sys.path.append(str(api_dir))

from database.connection import get_db

def check_routes():
    try:
        conn = get_db()
        cur = conn.cursor()
        
        # Check if routes table exists
        cur.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'routes'
            )
        """)
        
        table_exists = cur.fetchone()['exists']
        if not table_exists:
            print("The 'routes' table does not exist!")
            conn.close()
            return
        
        # Count routes
        cur.execute("SELECT COUNT(*) FROM routes")
        count = cur.fetchone()['count']
        print(f"Total routes in database: {count}")
        
        # List all routes
        cur.execute("SELECT id, name FROM routes ORDER BY id")
        routes = cur.fetchall()
        
        if routes:
            print("\nAvailable routes:")
            for route in routes:
                print(f"ID: {route['id']}, Name: {route['name']}")
        else:
            print("\nNo routes found in the database!")
        
        # Check for route with ID "01"
        cur.execute("SELECT * FROM routes WHERE id = %s", ("01",))
        route_01 = cur.fetchone()
        
        if route_01:
            print(f"\nRoute with ID '01' exists: {route_01['name']}")
        else:
            print("\nRoute with ID '01' does NOT exist!")
        
        conn.close()
    except Exception as e:
        print(f"Error checking routes: {e}")

if __name__ == "__main__":
    check_routes()