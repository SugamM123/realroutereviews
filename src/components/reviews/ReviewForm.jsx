'use client'

import { useState } from 'react'
import { StarIcon } from "lucide-react"

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

    try {
      const response = await fetch('http://localhost:8000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route_id: routeId,
          rating: parseInt(rating),
          comment,
          user_name: userName,
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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Your review has been submitted successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="mr-1 focus:outline-none"
              >
                <StarIcon
                  className={`h-6 w-6 ${
                    star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-gray-700">{rating} of 5</span>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Review</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
} 