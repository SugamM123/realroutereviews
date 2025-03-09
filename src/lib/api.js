const API_URL = 'http://localhost:8000';

export async function searchRoutes(query) {
  try {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch routes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching routes:', error);
    return [];
  }
}

export async function getRouteById(id) {
  try {
    const response = await fetch(`${API_URL}/routes/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch route with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching route ${id}:`, error);
    throw error;
  }
}

export async function getRouteReviews(routeId) {
  try {
    const response = await fetch(`${API_URL}/routes/${routeId}/reviews`);
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews for route ${routeId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching reviews for route ${routeId}:`, error);
    return [];
  }
}

export async function createReview(reviewData) {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to create review');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
}