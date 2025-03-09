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

export async function submitReview(reviewData) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
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
  console.log(`Fetching route with ID: ${id} from ${API_BASE_URL}/routes/${id}`);
  try {
    const response = await fetch(`${API_BASE_URL}/routes/${id}`);
    console.log('Response status:', response.status);
    
    const text = await response.text();
    console.log('Raw response:', text);
    
    let data;
    try {
      data = JSON.parse(text);
      console.log('Parsed data:', data);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      throw new Error(`Failed to parse response for route ${id}`);
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch route with ID ${id}`);
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching route ${id}:`, error);
    throw new Error(`Failed to fetch route with ID ${id}`);
  }
}
