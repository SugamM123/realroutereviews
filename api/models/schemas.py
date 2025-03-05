from pydantic import BaseModel
from typing import List
from datetime import datetime

class ReviewBase(BaseModel):
    route_id: str
    rating: int
    comment: str
    user_name: str

class Review(ReviewBase):
    id: int
    created_at: datetime

class RouteBase(BaseModel):
    id: str
    name: str
    stops: List[str]
    schedule: str

class Route(RouteBase):
    rating: float = 0.0
    reviews: List[Review] = []
    created_at: datetime