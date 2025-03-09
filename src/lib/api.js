const API_BASE_URL = 'https://realroutereviews-api.onrender.com'; // Replace with your actual Render URL
// const API_BASE_URL = 'http://localhost:8000';

export async function getRoutes() {
  try {
    const response = await fetch(`${API_BASE_URL}/routes`);
    if (!response.ok) {
      throw new Error('Failed to fetch routes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw new Error('Failed to fetch routes');
  }
}

export async function getRoute(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/routes/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch route with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching route ${id}:`, error);
    throw new Error(`Failed to fetch route with ID ${id}`);
  }
}

export async function getReviewsForRoute(routeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/routes/${routeId}/reviews`);
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews for route ${routeId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching reviews for route ${routeId}:`, error);
    throw new Error(`Failed to fetch reviews for route ${routeId}`);
  }
}

export async function searchRoutes(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch routes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching routes:', error);
    return [];
  }
}

export async function createReview(reviewData) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
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