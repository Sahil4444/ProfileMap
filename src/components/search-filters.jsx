"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

export function SearchFilters({ onSearch, profiles }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [country, setCountry] = useState("all")
  const [countries, setCountries] = useState([])

  // Extract unique countries from profiles
  useEffect(() => {
    if (profiles.length > 0) {
      const uniqueCountries = Array.from(new Set(profiles.map((profile) => profile.location.country))).sort()
      setCountries(uniqueCountries)
    }
  }, [profiles])

  // Handle search
  const handleSearch = () => {
    onSearch(searchTerm, { country })
  }

  // Handle reset
  const handleReset = () => {
    setSearchTerm("")
    setCountry("all")
    onSearch("", { country: "all" })
  }

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, city, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="pl-9"
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>

        <div className="w-full md:w-[200px]">
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className='cursor-pointer'>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem className='cursor-pointer' key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSearch} className="flex-1 md:flex-none cursor-pointer">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" onClick={handleReset} className="flex-1 md:flex-none cursor-pointer">
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
