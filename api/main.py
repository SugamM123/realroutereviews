from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import List, Optional
from pydantic import BaseModel
from database.connection import get_db

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://realroutereviews.vercel.app",  # Your Vercel frontend URL
        "http://localhost:3000",  # Add this for local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response validation
class RouteBase(BaseModel):
    id: str
    name: str
    description: str
    stops: List[str]
    schedule: str

class Route(RouteBase):
    created_at: Optional[str] = None

class ReviewBase(BaseModel):
    route_id: str
    rating: int
    comment: str
    user_name: str

class Review(ReviewBase):
    id: int
    created_at: Optional[str] = None

class ReviewCreate(BaseModel):
    route_id: str
    rating: int
    comment: str
    user_name: str

# Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to the TAMU Routes API"}

@app.get("/routes", response_model=List[Route])
def get_all_routes():
    conn = get_db()
    cur = conn.cursor()
    
    try:
        cur.execute("SELECT * FROM routes ORDER BY id")
        routes_data = cur.fetchall()
        
        routes = []
        for route in routes_data:
            # Convert JSON string to Python list
            stops = json.loads(route["stops"])
            
            routes.append({
                "id": route["id"],
                "name": route["name"],
                "description": route["description"],
                "stops": stops,
                "schedule": route["schedule"],
                "created_at": route["created_at"].isoformat() if route["created_at"] else None
            })
        
        return routes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/routes/{route_id}", response_model=Route)
def get_route(route_id: str):
    conn = get_db()
    cur = conn.cursor()
    
    try:
        # First try exact match
        cur.execute("SELECT * FROM routes WHERE id = %s", (route_id,))
        route = cur.fetchone()
        
        # If not found and input is numeric, try with leading zeros
        if not route and route_id.isdigit():
            # Try with different numbers of leading zeros (0, 00, 000)
            for i in range(1, 4):  # Try up to 3 leading zeros
                padded_id = route_id.zfill(i + len(route_id))
                cur.execute("SELECT * FROM routes WHERE id = %s", (padded_id,))
                route = cur.fetchone()
                if route:
                    break
        
        # If still not found, try case-insensitive name match
        if not route:
            cur.execute("SELECT * FROM routes WHERE LOWER(name) = LOWER(%s)", (route_id,))
            route = cur.fetchone()
        
        if not route:
            raise HTTPException(status_code=404, detail=f"Route with ID or name '{route_id}' not found")
        
        # Check if stops is already a Python object or a JSON string
        stops = route["stops"]
        if isinstance(stops, str):
            # If it's a string, parse it as JSON
            stops = json.loads(stops)
        
        return {
            "id": route["id"],
            "name": route["name"],
            "description": route["description"],
            "stops": stops,
            "schedule": route["schedule"],
            "created_at": route["created_at"].isoformat() if route["created_at"] else None
        }
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error parsing stops data")
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/routes/{route_id}/reviews", response_model=List[Review])
def get_route_reviews(route_id: str):
    conn = get_db()
    cur = conn.cursor()
    
    try:
        cur.execute("SELECT * FROM reviews WHERE route_id = %s ORDER BY created_at DESC", (route_id,))
        reviews_data = cur.fetchall()
        
        reviews = []
        for review in reviews_data:
            reviews.append({
                "id": review["id"],
                "route_id": review["route_id"],
                "rating": review["rating"],
                "comment": review["comment"],
                "user_name": review["user_name"],
                "created_at": review["created_at"].isoformat() if review["created_at"] else None
            })
        
        return reviews
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.post("/reviews", response_model=Review)
def create_review_direct(review: ReviewCreate):
    conn = get_db()
    cur = conn.cursor()
    
    try:
        # First try to find the route by exact ID
        cur.execute("SELECT id FROM routes WHERE id = %s", (review.route_id,))
        route = cur.fetchone()
        
        # If not found and it might be a name, try to find by name
        if not route:
            cur.execute("SELECT id FROM routes WHERE LOWER(name) = LOWER(%s)", (review.route_id,))
            route = cur.fetchone()
            
        # If still not found and it's numeric, try with leading zeros
        if not route and review.route_id.isdigit():
            # Try with different numbers of leading zeros
            for i in range(1, 4):
                padded_id = review.route_id.zfill(i + len(review.route_id))
                cur.execute("SELECT id FROM routes WHERE id = %s", (padded_id,))
                route = cur.fetchone()
                if route:
                    break
        
        if not route:
            raise HTTPException(status_code=404, detail=f"Route with ID or name '{review.route_id}' not found")
        
        # Use the actual route ID from the database
        actual_route_id = route["id"]
        
        # Insert the review with the correct route_id
        cur.execute("""
            INSERT INTO reviews (route_id, rating, comment, user_name)
            VALUES (%s, %s, %s, %s)
            RETURNING id, route_id, rating, comment, user_name, created_at
        """, (
            actual_route_id,  # Use the actual route ID from the database
            review.rating,
            review.comment,
            review.user_name
        ))
        
        new_review = cur.fetchone()
        conn.commit()
        
        return {
            "id": new_review["id"],
            "route_id": new_review["route_id"],
            "rating": new_review["rating"],
            "comment": new_review["comment"],
            "user_name": new_review["user_name"],
            "created_at": new_review["created_at"].isoformat() if new_review["created_at"] else None
        }
    except Exception as e:
        conn.rollback()
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.post("/routes/{route_id}/reviews", response_model=Review)
def create_review_nested(route_id: str, review: ReviewCreate):
    # Set the route_id from the URL parameter
    review.route_id = route_id
    # Reuse the direct endpoint logic
    return create_review_direct(review)

@app.get("/search", response_model=List[Route])
def search_routes(q: str):
    conn = get_db()
    cur = conn.cursor()
    
    try:
        routes_data = []
        
        # First try exact match
        cur.execute("SELECT * FROM routes WHERE id = %s OR LOWER(name) = LOWER(%s)", (q, q))
        exact_matches = cur.fetchall()
        routes_data.extend(exact_matches)
        
        # If input is numeric, try with leading zeros
        if q.isdigit() and not exact_matches:
            for i in range(1, 4):  # Try up to 3 leading zeros
                padded_id = q.zfill(i + len(q))
                cur.execute("SELECT * FROM routes WHERE id = %s", (padded_id,))
                padded_matches = cur.fetchall()
                routes_data.extend(padded_matches)
                if padded_matches:
                    break
        
        # If no exact matches found, try partial matches
        if not routes_data:
            cur.execute("""
                SELECT * FROM routes 
                WHERE id ILIKE %s OR name ILIKE %s
                ORDER BY id
            """, (f"%{q}%", f"%{q}%"))
            routes_data = cur.fetchall()
        
        routes = []
        for route in routes_data:
            # Convert JSON string to Python list
            stops = json.loads(route["stops"])
            
            routes.append({
                "id": route["id"],
                "name": route["name"],
                "description": route["description"],
                "stops": stops,
                "schedule": route["schedule"],
                "created_at": route["created_at"].isoformat() if route["created_at"] else None
            })
        
        return routes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/routes/search/{name}")
def search_route_by_name(name: str):
    conn = get_db()
    cur = conn.cursor()
    
    # Search for routes with matching name (case insensitive)
    cur.execute("""
        SELECT * FROM routes 
        WHERE LOWER(name) = LOWER(%s)
    """, (name,))
    
    route = cur.fetchone()
    conn.close()
    
    if not route:
        raise HTTPException(status_code=404, detail=f"Route with name {name} not found")
    
    # Convert row to dict and parse stops from JSON
    route_dict = dict(route)
    route_dict['stops'] = json.loads(route_dict['stops'])
    
    return route_dict

# Run the app with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)