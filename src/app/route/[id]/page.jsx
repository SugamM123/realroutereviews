'use client'

import { useEffect, useState } from "react"
import { RouteHeader } from "@/components/route/RouteHeader"
import { RouteStats } from "@/components/route/RouteStats"
import { ReviewList } from "@/components/reviews/ReviewList"
import { ReviewForm } from "@/components/reviews/ReviewForm"
import { getRouteById, getRouteReviews } from '@/lib/api'
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function RoutePage({ params }) {
  const { id } = params
  const [routeData, setRouteData] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch route data
        const route = await getRouteById(id)
        setRouteData(route)
        
        // Fetch reviews
        const reviewsData = await getRouteReviews(id)
        setReviews(reviewsData)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(`Failed to fetch route ${id}`)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [id])

  const handleReviewAdded = (newReview) => {
    // Add the new review to the reviews list
    setReviews((prevReviews) => [newReview, ...prevReviews])
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">Loading...</h1>
      </div>
    )
  }

  if (error || !routeData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-red-600">
          {error || 'Route not found'}
        </h1>
      </div>
    )
  }

  // Calculate average rating from reviews
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'N/A'

  const stats = {
    onTime: `${routeData?.rating || 0}/5`,
    overall: `${routeData?.rating || 0}/5`,
    reliability: `${routeData?.rating || 0}/5`
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <RouteHeader id={routeData.id} name={routeData.name} rating={averageRating} />
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6 text-black">Reviews</h2>
        
        <ReviewForm routeId={id} onReviewAdded={handleReviewAdded} />
        
        {reviews.length > 0 ? (
          <ReviewList reviews={reviews} />
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review this route!</p>
        )}
      </div>

      {/* Home button after any text car with more spacing from the review cards */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 mt-8">
        <Link href="/">
          <Button>
            <Home /> Home
          </Button>
        </Link>
      </div>
    </div>
  )
}