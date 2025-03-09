import sys
from pathlib import Path

# Add the parent directory to the path so we can import from the api package
api_dir = Path(__file__).parent.parent
sys.path.append(str(api_dir))

from database.connection import get_db

def check_connection():
    try:
        conn = get_db()
        cur = conn.cursor()
        
        # Test query
        cur.execute("SELECT current_database(), current_user")
        result = cur.fetchone()
        
        print("Connection to PostgreSQL established successfully!")
        print(f"Database: {result['current_database']}")
        print(f"User: {result['current_user']}")
        
        conn.close()
        return True
    except Exception as e:
        print(f"Error connecting to PostgreSQL: {e}")
        return False

if __name__ == "__main__":
    check_connection()