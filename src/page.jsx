"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { MapPin, Users, Settings } from "lucide-react"

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to profiles page after a short delay for animation
    const timeout = setTimeout(() => {
      navigate("/ProfileMap/profiles");
    }, 2500)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-teal-950 dark:to-emerald-900">
      <div className="text-center space-y-6 animate-fadeIn">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <MapPin className="h-16 w-16 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <div className="absolute -top-2 -right-2">
              <Users className="h-8 w-8 text-teal-700 dark:text-teal-300" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-teal-800 dark:text-teal-200 sm:text-5xl md:text-6xl">
          Profile<span className="text-emerald-600 dark:text-emerald-400">Map</span>
        </h1>

        <p className="max-w-md mx-auto text-lg text-teal-700 dark:text-teal-300">
          Explore profiles and their locations interactively
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
            onClick={() => navigate("/ProfileMap/profiles")}
          >
            <Users className="mr-2 h-5 w-5" />
            Browse Profiles
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-emerald-600 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950 cursor-pointer"
            onClick={() => navigate("/ProfileMap/admin")}
          >
            <Settings className="mr-2 h-5 w-5" />
            Admin Panel
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 animate-bounce">
        <MapPin className="h-8 w-8 text-emerald-500 dark:text-emerald-400" />
      </div>
    </div>
  )
}