import Image from "next/image";
import Link from "next/link";
import { BusFront, MapPin, Star } from "lucide-react";
import { SearchInterface } from "@/components/SearchInterface";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative px-4 pt-10 sm:pt-16 pb-20 sm:pb-32 overflow-hidden">
        {/* Background Pattern - hidden on smallest screens */}
        <div className="absolute inset-0 z-0 opacity-10 hidden sm:block">
          <div className="absolute inset-0" style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c53030' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px"
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Title - responsive font sizes */}
          <div className="text-center">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-red-700 mb-4 sm:mb-6 px-2">
              <span className="inline-block transform hover:scale-105 transition-transform duration-300">Real Route Reviews</span>
            </h1>
            
            <p className="mt-2 sm:mt-3 max-w-md mx-auto text-sm xs:text-base sm:text-lg md:text-xl md:max-w-3xl text-gray-700 px-4">
              Discover and review bus routes at Texas A&M. Share your experiences and help others find the best routes!
            </p>
            
            {/* Feature Icons - responsive grid */}
            <div className="mt-6 sm:mt-10 max-w-2xl mx-auto grid grid-cols-3 gap-2 xs:gap-4 sm:gap-8 px-2">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 rounded-full bg-red-100 text-red-700 mb-2 sm:mb-3">
                  <BusFront className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-xs xs:text-sm font-medium text-gray-900">Find Routes</h3>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 rounded-full bg-red-100 text-red-700 mb-2 sm:mb-3">
                  <Star className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-xs xs:text-sm font-medium text-gray-900">Rate Experiences</h3>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 rounded-full bg-red-100 text-red-700 mb-2 sm:mb-3">
                  <MapPin className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-xs xs:text-sm font-medium text-gray-900">Track Stops</h3>
              </div>
            </div>
          </div>
          
          {/* Search Box - responsive padding and layout */}
          <div className="mt-8 sm:mt-12 md:mt-16 px-2 sm:px-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden p-4 sm:p-6 md:p-8 transform hover:shadow-2xl transition-all duration-300">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Search for a Route</h2>
              
              <SearchInterface />
            </div>
          </div>
        </div>
      </div>
      
      {/* Meet the Dev Section - responsive spacing */}
      <div className="bg-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Meet the Dev</h2>
            
            <div className="inline-block">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-full opacity-75 group-hover:opacity-100 blur-sm transition duration-300"></div>
                <Link href="/about">
                  <div className="relative">
                    <Image 
                      src="/dev.png" 
                      alt="Meet the Dev" 
                      width={150} 
                      height={150} 
                      className="rounded-full object-cover transform group-hover:scale-105 transition-all duration-300"
                      sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, 180px"
                    />
                  </div>
                </Link>
              </div>
              
              <p className="mt-4 text-xs sm:text-sm text-gray-600 max-w-xs mx-auto px-4">
                Created by Sugam Mishra, a student at Texas A&M University passionate about improving campus transportation.
              </p>
              
              <Link href="/about">
                <button className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-red-700 border border-red-700 rounded-full hover:bg-red-50 transition-colors duration-200">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - responsive padding */}
      <footer className="bg-gray-800 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm">© 2023 Real Route Reviews. All rights reserved.</p>
            <p className="text-xs mt-2 text-gray-400">
              Not affiliated with Texas A&M Transportation Services.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
