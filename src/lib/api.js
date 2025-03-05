export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const fetchRoute = async (routeId) => {
  const response = await fetch(`${API_BASE}/routes/${routeId}`)
  return response.json()
}

export const submitReview = async (reviewData) => {
  const response = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  })
  return response.json()
}