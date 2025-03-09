import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get database connection parameters from environment variables
# No default values for sensitive information
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

def get_db():
    # Only proceed if all required parameters are available
    if all([DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT]):
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            sslmode='require',  # Ensure SSL is used for secure connections
            cursor_factory=RealDictCursor  # This allows accessing columns by name
        )
        return conn
    else:
        raise ValueError("Database connection parameters are missing")

def init_db():
    conn = get_db()
    cur = conn.cursor()
    
    # Create routes table
    cur.execute('''
    CREATE TABLE IF NOT EXISTS routes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        stops JSONB NOT NULL,
        schedule TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create reviews table
    cur.execute('''
    CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
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