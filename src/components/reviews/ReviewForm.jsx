'use client'

import { useState } from "react"
import { StarIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ReviewForm({ routeId, onReviewSubmitted }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route_id: routeId,
          rating,
          comment,
          user_name: "Anonymous", // You can modify this to get the actual user name
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit review")
      }

      // Reset form fields
      setRating(0)
      setComment("")

      // Call the parent function to refresh reviews
      onReviewSubmitted()
    } catch (error) {
      console.error("Error submitting review:", error)
    }
  }

  return (
    <div className="bg-gray-300 rounded-full p-4 sm:p-6 md:p-8 lg:p-10 mt-6">
      <h2 className="text-xl font-bold text-red-700 text-center mb-4">
        Write a Review
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <StarIcon 
                className={`h-8 w-8 ${
                  star <= rating ? 'text-yellow-500' : 'text-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
        
        <Input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="w-full rounded-full bg-white text-black"
        />
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red-700 text-white px-6 py-2 rounded-full hover:bg-red-600"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  )
} 