import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ButtonWithIcon() {
  return (
    <Link href="/">
      <Button>
        <Home className="mr-2" /> Home
      </Button>
    </Link>
  )
}

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24 bg-gray-100 relative">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-700 text-center absolute top-4 sm:top-8 md:top-12 px-4 w-full">About Me</h1>
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm text-center mt-16 sm:mt-12">
        <p className="text-base sm:text-lg mb-6 sm:mb-10 px-4">
          Hello! I'm Sugam Mishra, a passionate developer with a love for creating intuitive and dynamic web applications. 
          I specialize in building user-friendly interfaces and ensuring seamless user experiences.
        </p>
        <p className="text-base sm:text-lg mb-6 sm:mb-10 px-4">
          I am a student at Texas A&M University with a background in Computer Science, and I enjoy working with 
          technologies like JavaScript, React, and Next.js. My goal is to continuously learn and improve my skills while 
          contributing to meaningful projects.
        </p>
        <p className="text-base sm:text-lg mb-6 sm:mb-10 px-4">
          In my free time, I love exploring new technologies, working on side projects, and playing sports.
        </p>
        <p className="text-base sm:text-lg mb-6 sm:mb-10 px-4">
          Thank you for visiting my page! Feel free to reach out if you want to connect or collaborate on exciting projects.
        </p>
        <div className="px-4">
          <ButtonWithIcon />
        </div>
      </div>
    </main>
  )
}
