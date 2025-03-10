'use client'

import { useState } from 'react'
import { StarIcon, ClockIcon, BusIcon, UserIcon } from "lucide-react"
import { API_BASE_URL } from '@/lib/api'

export function ReviewForm({ routeId, routeData, onReviewAdded }) {
  const [ratings, setRatings] = useState({
    overall: 5,
    punctuality: 5,
    cleanliness: 5,
    crowdedness: 5
  })
  const [comment, setComment] = useState('')
  const [userName, setUserName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Use the actual route ID from the database, not the URL parameter
  const actualRouteId = routeData?.id || routeId;

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    // Use "Anonymous" if no name is provided
    const finalUserName = userName.trim() || "Anonymous"

    try {
      // Use the direct /reviews endpoint
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route_id: routeId,
          rating: ratings.overall,
          comment: comment.trim(),
          user_name: finalUserName,
        }),
      });

      // Handle non-OK responses
      if (!response.ok) {
        let errorMessage = `Error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          // If response is not JSON
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Parse the response
      const newReview = await response.json();
      
      // Show success message
      setSuccess(true);
      
      // Reset form
      setComment('');
      setUserName('');
      setRatings({
        overall: 5,
        punctuality: 5,
        cleanliness: 5,
        crowdedness: 5
      });
      
      // Notify parent component
      if (onReviewAdded) {
        onReviewAdded(newReview);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError(error.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rating component for each category
  const RatingSelector = ({ category, label, icon: Icon }) => (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <Icon className="h-5 w-5 text-red-600 mr-2" />
        <label className="font-medium text-gray-800">{label}</label>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(category, star)}
            className="transition-all duration-200 hover:scale-110 focus:outline-none"
          >
            <StarIcon 
              className={`h-7 w-7 ${
                star <= ratings[category] 
                  ? "text-yellow-500 fill-yellow-500" 
                  : "text-gray-300"
              }`} 
            />
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Your review has been submitted successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Name (Optional)</label>
          <input
            type="text"
            className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Anonymous"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RatingSelector 
            category="overall" 
            label="Overall Experience" 
            icon={StarIcon} 
          />
          <RatingSelector 
            category="punctuality" 
            label="Punctuality" 
            icon={ClockIcon} 
          />
          <RatingSelector 
            category="cleanliness" 
            label="Cleanliness" 
            icon={BusIcon} 
          />
          <RatingSelector 
            category="crowdedness" 
            label="Crowdedness" 
            icon={UserIcon} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
          <textarea
            className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Share your experience with this route..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full sm:w-auto bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-6 rounded-lg text-base transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span> : 
            'Submit Review'
          }
        </button>
      </form>
    </div>
  )
} 