'use client'

import { useEffect, useState } from "react"
import { RouteHeader } from "@/components/route/RouteHeader"
import { RouteStats } from "@/components/route/RouteStats"
import { ReviewList } from "@/components/reviews/ReviewList"
import { ReviewForm } from "@/components/reviews/ReviewForm"

export default function RoutePage({ params }) {
  const { id } = params
  const [routeData, setRouteData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        console.log('Fetching route data...'); // Debug log
        const response = await fetch(`http://localhost:8000/routes/${id}`);
        console.log('Response:', response); // Debug log
        
        if (!response.ok) {
          throw new Error(`Failed to fetch route ${id}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data); // Debug log
        
        setRouteData(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-xl font-bold text-red-700">
          Loading TAMU Route {id}...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-xl font-bold text-red-700">
          Error: {error}
        </div>
      </div>
    );
  }

  // Create stats object from the route data
  const stats = {
    onTime: `${routeData?.rating || 0}/5`,
    overall: `${routeData?.rating || 0}/5`,
    reliability: `${routeData?.rating || 0}/5`
  }

  return (
    <div className="min-h-screen bg-gray-200 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <RouteHeader 
          id={routeData?.id || id} 
          name={routeData?.name || `Route ${id}`} 
          rating={routeData?.rating || 0} 
        />
        <RouteStats stats={stats} />
        <ReviewForm routeId={id} />
        <ReviewList reviews={routeData?.reviews || []} />
      </div>
    </div>
  )
} 