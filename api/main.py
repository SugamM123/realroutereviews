from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import RouteBase, ReviewBase
from database.connection import init_db
from database.operations import get_route, create_review, add_route
import sqlite3
import json

app = FastAPI()

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
def get_db():
    conn = sqlite3.connect('database/tamu_routes.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/routes/{route_id}")
async def get_tamu_route(route_id: str):
    # Keep original ID for display, normalize for database lookup
    original_id = route_id
    if '-' not in route_id:  # Only normalize simple numeric IDs
        try:
            # Handle both "1" and "01" formats
            route_id = f"{int(route_id):02d}"
        except ValueError:
            pass  # Leave non-numeric IDs as-is
    
    conn = get_db()
    cur = conn.cursor()
    
    # Get route info
    cur.execute("""
        SELECT routes.*, 
               COALESCE(AVG(reviews.rating), 0) as avg_rating
        FROM routes 
        LEFT JOIN reviews ON routes.id = reviews.route_id
        WHERE routes.id = ?
        GROUP BY routes.id
    """, (route_id,))
    
    route = cur.fetchone()
    
    if not route:
        return {
            "id": original_id,
            "name": f"Route {original_id}",
            "stops": [],
            "schedule": "Not available",
            "rating": 0,
            "reviews": []
        }
    
    # Get reviews
    cur.execute("""
        SELECT * FROM reviews 
        WHERE route_id = ? 
        ORDER BY created_at DESC
    """, (route_id,))
    
    reviews = cur.fetchall()
    
    return {
        "id": route["id"],
        "name": route["name"],
        "stops": json.loads(route["stops"]),
        "schedule": route["schedule"],
        "rating": float(route["avg_rating"]),
        "reviews": [{
            "id": r["id"],
            "userName": r["user_name"],
            "rating": r["rating"],
            "comment": r["comment"]
        } for r in reviews]
    }

@app.post("/reviews")
async def create_route_review(review: ReviewBase):
    try:
        review_id = create_review(
            review.route_id,
            review.rating,
            review.comment,
            review.user_name
        )
        return {"id": review_id, "message": "Review created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/routes")
async def create_route(route: RouteBase):
    try:
        add_route(route.id, route.name, route.stops, route.schedule)
        return {"message": "Route created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))