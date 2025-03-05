import json
from typing import List, Optional
from .connection import get_db

def get_route(route_id: str):
    conn = get_db()
    cur = conn.cursor()
    
    # Get route info with average rating
    cur.execute('''
        SELECT routes.*, 
               COALESCE(AVG(reviews.rating), 0) as avg_rating
        FROM routes 
        LEFT JOIN reviews ON routes.id = reviews.route_id
        WHERE routes.id = ?
        GROUP BY routes.id
    ''', (route_id,))
    
    route = cur.fetchone()
    
    if not route:
        return None
    
    # Get reviews for the route
    cur.execute('''
        SELECT * FROM reviews 
        WHERE route_id = ? 
        ORDER BY created_at DESC
    ''', (route_id,))
    
    reviews = cur.fetchall()
    
    # Convert row to dict and parse stops from JSON
    route_dict = dict(route)
    route_dict['stops'] = json.loads(route_dict['stops'])
    route_dict['reviews'] = [dict(review) for review in reviews]
    
    conn.close()
    return route_dict

def create_review(route_id: str, rating: int, comment: str, user_name: str):
    conn = get_db()
    cur = conn.cursor()
    
    cur.execute('''
        INSERT INTO reviews (route_id, rating, comment, user_name)
        VALUES (?, ?, ?, ?)
    ''', (route_id, rating, comment, user_name))
    
    conn.commit()
    review_id = cur.lastrowid
    conn.close()
    return review_id

def add_route(route_id: str, name: str, stops: List[str], schedule: str):
    conn = get_db()
    cur = conn.cursor()
    
    cur.execute('''
        INSERT INTO routes (id, name, stops, schedule)
        VALUES (?, ?, ?, ?)
    ''', (route_id, name, json.dumps(stops), schedule))
    
    conn.commit()
    conn.close()