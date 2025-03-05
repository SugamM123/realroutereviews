import sqlite3
from pathlib import Path

# Create database directory if it doesn't exist
DB_DIR = Path(__file__).parent
DB_DIR.mkdir(exist_ok=True)
DB_PATH = DB_DIR / "tamu_routes.db"

def get_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row  # This allows accessing columns by name
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()
    
    # Create routes table
    cur.execute('''
    CREATE TABLE IF NOT EXISTS routes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        stops TEXT NOT NULL,  -- Stored as JSON string
        schedule TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create reviews table
    cur.execute('''
    CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        route_id TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
        comment TEXT NOT NULL,
        user_name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (route_id) REFERENCES routes (id)
    )
    ''')
    
    conn.commit()
    conn.close()