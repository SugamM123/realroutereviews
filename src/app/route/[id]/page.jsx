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
import { useRouter } from "next/navigation"

export default function RoutePage({ params }) {
  const { id } = params
  const [routeData, setRouteData] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch route data
        const route = await getRouteById(id)
        setRouteData(route)
        
        // If the URL doesn't match the canonical ID, redirect
        if (route.id !== id) {
          router.replace(`/route/${route.id}`, undefined, { shallow: true });
        }
        
        // Fetch reviews
        const reviewsData = await getRouteReviews(route.id)
        setReviews(reviewsData)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(`Failed to fetch route ${id}`)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [id, router])

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

  // Calculate average ratings for each category
  const calculateAverageRatings = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    
    const sum = {
      punctuality: 0,
      cleanliness: 0,
      crowdedness: 0
    };
    
    reviews.forEach(review => {
      sum.punctuality += review.punctuality || review.rating;
      sum.cleanliness += review.cleanliness || review.rating;
      sum.crowdedness += review.crowdedness || review.rating;
    });
    
    return {
      punctuality: (sum.punctuality / reviews.length).toFixed(1),
      cleanliness: (sum.cleanliness / reviews.length).toFixed(1),
      crowdedness: (sum.crowdedness / reviews.length).toFixed(1)
    };
  };

  const averageRatings = calculateAverageRatings(reviews);

  const stats = {
    onTime: `${routeData?.rating || 0}/5`,
    overall: `${routeData?.rating || 0}/5`,
    reliability: `${routeData?.rating || 0}/5`
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <RouteHeader 
        id={routeData.id} 
        name={routeData.name} 
        rating={averageRating} 
        description={routeData.description} 
        stops={routeData.stops}
        ratings={averageRatings}
      />
      
      <div className="mt-8 sm:mt-12">
        <h2 className="text-2xl font-bold mb-6 text-red-700 border-b-2 border-red-200 pb-2">Reviews</h2>
        
        <ReviewForm 
          routeId={id} 
          routeData={routeData} 
          onReviewAdded={handleReviewAdded} 
        />
        
        <div className="mt-8 mb-20">
          {reviews.length > 0 ? (
            <div className="space-y-4">
              <p className="text-gray-600 font-medium">{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</p>
              <ReviewList reviews={reviews} />
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-sm">
              <p className="text-gray-500 text-lg">No reviews yet. Be the first to review this route!</p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <Link href="/">
          <button className="flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group">
            <Home className="mr-2 group-hover:animate-pulse" />
            <span>Home</span>
          </button>
        </Link>
      </div>
    </div>
  )
}