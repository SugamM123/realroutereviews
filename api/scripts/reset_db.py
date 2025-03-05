import sys
from pathlib import Path
api_dir = Path(__file__).parent.parent
sys.path.append(str(api_dir))

from database.connection import DB_PATH, init_db

def reset_database():
    # Remove the existing database file
    if DB_PATH.exists():
        print(f"Removing existing database: {DB_PATH}")
        DB_PATH.unlink()
    
    # Create new database
    print("Initializing new database...")
    init_db()
    print("Database reset complete!")

if __name__ == "__main__":
    reset_database()