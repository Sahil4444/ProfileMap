"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useProfiles } from "@/hooks/use-profiles"
import { ProfileList } from "@/components/profile-list"
import { ProfileMap } from "@/components/profile-map"
import { SearchFilters } from "@/components/search-filters"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, MapPin, Grid, List } from "lucide-react"

export default function ProfilesPage() {
  const navigate = useNavigate()
  const { profiles, loading, error } = useProfiles()
  const [filteredProfiles, setFilteredProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [viewMode, setViewMode] = useState("grid")
  const [activeTab, setActiveTab] = useState("profiles")

  useEffect(() => {
    if (profiles) {
      setFilteredProfiles(profiles)
    }
  }, [profiles])

  const handleSearch = (searchTerm, filters) => {
    if (!profiles) return

    let results = [...profiles]

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(
        (profile) =>
          profile.name.toLowerCase().includes(term) ||
          profile.location.city.toLowerCase().includes(term) ||
          profile.location.country.toLowerCase().includes(term),
      )
    }

    // Apply additional filters
    if (filters.country && filters.country !== "all") {
      results = results.filter((profile) => profile.location.country === filters.country)
    }

    setFilteredProfiles(results)
  }

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile)
    setActiveTab("map")
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 dark:bg-red-950 p-4">
        <div className="text-red-600 dark:text-red-400 text-xl font-semibold mb-4">Error loading profiles</div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <Loader2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400 animate-spin mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">Loading profiles...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 animate-fadeIn">
              <SearchFilters onSearch={handleSearch} profiles={profiles || []} />
            </div>

            <Tabs
              defaultValue="profiles"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full animate-fadeIn"
            >
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="profiles" className="flex items-center gap-2 cursor-pointer">
                    <Grid className="h-4 w-4" />
                    Profiles
                  </TabsTrigger>
                  <TabsTrigger value="map" className="flex items-center gap-2 cursor-pointer">
                    <MapPin className="h-4 w-4" />
                    Map View
                  </TabsTrigger>
                </TabsList>

                {activeTab === "profiles" && (
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-9 px-2.5 cursor-pointer"
                    >
                      <Grid className="h-4 w-4" />
                      <span className="sr-only">Grid View</span>
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-9 px-2.5 cursor-pointer"
                    >
                      <List className="h-4 w-4" />
                      <span className="sr-only">List View</span>
                    </Button>
                  </div>
                )}
              </div>

              <TabsContent value="profiles" className="mt-0">
                <ProfileList
                  profiles={filteredProfiles}
                  viewMode={viewMode}
                  onProfileSelect={handleProfileSelect}
                  onProfileClick={(profile) => navigate(`/ProfileMap/profiles/${profile.id}`)}
                />
              </TabsContent>

              <TabsContent value="map" className="mt-0">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-[70vh]">
                  <ProfileMap
                    profiles={filteredProfiles}
                    selectedProfile={selectedProfile}
                    onProfileSelect={(profile) => navigate(`/ProfileMap/profiles/${profile.id}`)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
}
