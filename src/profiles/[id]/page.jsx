"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useProfiles } from "@/hooks/use-profiles"
import { ProfileMap } from "@/components/profile-map"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Mail, Phone, Briefcase, Calendar, Globe, User, Loader2 } from "lucide-react"
import placeHolderJpg from "/placeholder.svg";


export default function ProfileDetailPage() {
  const navigate = useNavigate()
  const params = useParams()
  const { profiles, loading, error } = useProfiles()
  const [profile, setProfile] = useState(null)

  const { id } = useParams(); // 👈 get profile id from route

  useEffect(() => {
    if (profiles && id) {
      const found = profiles.find((p) => String(p.id) === id);
      setProfile(found);
    }
  }, [profiles, id]);

  if (!profile) {
    return <div className="text-center p-6">Loading profile...</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400 animate-spin" />
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <div className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            {error || "Profile not found"}
          </div>
          <Button onClick={() => navigate("/ProfileMap/profiles")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profiles
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/ProfileMap/profiles")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profiles
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 animate-slide-in-left">
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img src={profile.avatar || placeHolderJpg} alt={profile.name} className="object-cover w-fit h-full" />
              </div>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {profile.location.city}, {profile.location.country}
                  </span>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <div>{profile.email}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                      <div>{profile.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Occupation</div>
                      <div>{profile.occupation}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Joined</div>
                      <div>{profile.joinedDate}</div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6 animate-slide-in-right">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                  About
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="map">
              <TabsList className="mb-4">
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </TabsTrigger>
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Address Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="map">
                <Card>
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    <ProfileMap profiles={[profile]} selectedProfile={profile} singleProfileMode />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-700 dark:text-gray-300">Street Address</h3>
                        <p className="text-gray-600 dark:text-gray-400">{profile.location.street}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-gray-700 dark:text-gray-300">City</h3>
                          <p className="text-gray-600 dark:text-gray-400">{profile.location.city}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-700 dark:text-gray-300">State/Province</h3>
                          <p className="text-gray-600 dark:text-gray-400">{profile.location.state}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-gray-700 dark:text-gray-300">Postal Code</h3>
                          <p className="text-gray-600 dark:text-gray-400">{profile.location.postalCode}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-700 dark:text-gray-300">Country</h3>
                          <p className="text-gray-600 dark:text-gray-400">{profile.location.country}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700 dark:text-gray-300">Coordinates</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {profile.location.coordinates.lat.toFixed(6)}, {profile.location.coordinates.lng.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
