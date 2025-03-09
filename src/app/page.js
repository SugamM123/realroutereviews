import Image from "next/image";
import { SearchInterface } from "@/components/SearchInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24 bg-gray-100 relative">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-700 text-center absolute top-4 sm:top-8 md:top-12 px-4 w-full">Real Route Reviews</h1>
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm text-center mt-16 sm:mt-12">
        <div className="h-4"></div>
        
        <p className="text-base sm:text-lg mb-6 sm:mb-10 -mt-4 sm:-mt-8 px-4">
          Discover and review bus routes at Texas A&M. Share your experiences and help others find the best routes!
        </p>
        
        <SearchInterface />
      </div>
    </main>
  );
}
