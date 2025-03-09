import Image from "next/image";
import { SearchInterface } from "@/components/SearchInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 relative">
      <h1 className="text-6xl font-bold text-red-700 absolute top-12">Real Route Reviews</h1>
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm text-center">
        <div className="h-4"></div>
        
        <p className="text-lg mb-10 -mt-8">
          Discover and review bus routes at Texas A&M. Share your experiences and help others find the best routes!
        </p>
        
        <SearchInterface />
      </div>
    </main>
  );
}
