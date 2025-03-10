// Use local API for development, remote for production
// const API_BASE_URL = 'http://localhost:8000'  // Local development server
const API_BASE_URL = 'https://realroutereviews-api.onrender.com'; // Production server

export { API_BASE_URL };

// Helper function to handle API responses safely
export async function handleApiResponse(response) {
  if (!response.ok) {
    // Try to get error details if available
    let errorMessage = `Server error: ${response.status}`;
    try {
      const errorText = await response.text();
      if (errorText) {
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          // If not valid JSON, use the text directly
          errorMessage = errorText || errorMessage;
        }
      }
    } catch (e) {
      // If text() fails, use status text
      errorMessage = `Server error: ${response.status} ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  // Check if response has content before parsing
  const text = await response.text();
  if (!text) {
    return null; // Return null for empty responses
  }
  
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Invalid JSON response:", text);
    throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
  }
}

// Updated API functions using the helper
export async function getRoutes() {
  try {
    const response = await fetch(`${API_BASE_URL}/routes`);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }
}

export async function getRoute(routeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/routes/${routeId}`);
    return await handleApiResponse(response);
  } catch (error) {
    console.error(`Error fetching route ${routeId}:`, error);
    throw error;
  }
}

export async function getRouteReviews(routeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/routes/${routeId}/reviews`);
    return await handleApiResponse(response);
  } catch (error) {
    console.error(`Error fetching reviews for route ${routeId}:`, error);
    throw error;
  }
}

export async function submitReview(routeId, rating, comment, userName) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        route_id: routeId,
        rating,
        comment,
        user_name: userName,
      }),
    });
    
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
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
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error searching routes:', error);
    return []; // Return empty array on error
  }
}

export async function getRouteById(id) {
  try {
    // First try to get the route directly by ID
    const response = await fetch(`${API_BASE_URL}/routes/${encodeURIComponent(id)}`);
    
    if (!response.ok) {
      // If not found by ID, try searching
      const searchResponse = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(id)}`);
      const searchResults = await handleApiResponse(searchResponse);
      
      if (searchResults && searchResults.length > 0) {
        // Use the first search result
        const routeResponse = await fetch(`${API_BASE_URL}/routes/${searchResults[0].id}`);
        return await handleApiResponse(routeResponse);
      }
      
      throw new Error(`Route not found: ${id}`);
    }
    
    return await handleApiResponse(response);
  } catch (error) {
    console.error(`Error fetching route ${id}:`, error);
    throw error;
  }
}
