'use client'

import { useState } from 'react'
import { StarIcon } from "lucide-react"
import { API_BASE_URL } from '@/lib/api'

export function ReviewForm({ routeId, onReviewAdded }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [userName, setUserName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    // Use "Anonymous" if no name is provided
    const finalUserName = userName.trim() || "Anonymous"

    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route_id: routeId,
          rating: parseInt(rating),
          comment,
          user_name: finalUserName,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to submit review')
      }

      const newReview = await response.json()
      setSuccess(true)
      setComment('')
      setRating(5)
      setUserName('')
      
      // Notify parent component that a new review was added
      if (onReviewAdded) {
        onReviewAdded(newReview)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-3 text-black">Add Your Review</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded mb-3 text-sm">
          Your review has been submitted!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm text-gray-700 mb-1">Your Name (Optional)</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Anonymous"
          />
        </div>
        
        <div className="mb-3">
          <label className="block text-sm text-gray-700 mb-1">Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="mr-1 focus:outline-none"
              >
                <StarIcon
                  className={`h-5 w-5 ${
                    star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-700">{rating} of 5</span>
          </div>
        </div>
        
        <div className="mb-3">
          <label className="block text-sm text-gray-700 mb-1">Your Review</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Share your experience with this route..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-red-700 hover:bg-red-800 text-white text-sm font-medium py-2 px-4 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
} 