"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, MapPin, Mail, Phone, Briefcase, Tag, Plus, X, Save, Loader2 } from "lucide-react"

export function ProfileForm({ profile, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    occupation: "",
    bio: "",
    avatar: "/a1.jpg",
    joinedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    interests: [],
    location: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
  })

  const [newInterest, setNewInterest] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  // Initialize form with profile data if editing
  useEffect(() => {
    if (profile) {
      setFormData(profile)
    } else {
      // Reset form for new profile
      setFormData({
        id: uuidv4(),
        name: "",
        email: "",
        phone: "",
        occupation: "",
        bio: "",
        avatar: "",
        joinedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        interests: [],
        location: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          coordinates: {
            lat: 0,
            lng: 0,
          },
        },
      })
    }
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleCoordinateChange = (e) => {
    const { name, value } = e.target
    const numValue = Number.parseFloat(value) || 0

    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: {
          ...prev.location.coordinates,
          [name]: numValue,
        },
      },
    }))
  }

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }))
      setNewInterest("")
    }
  }

  const handleRemoveInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddInterest()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))
      onSubmit(formData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.bio.trim() !== "" &&
      formData.location.city.trim() !== "" &&
      formData.location.country.trim() !== "" &&
      formData.location.coordinates.lat !== 0 &&
      formData.location.coordinates.lng !== 0
    )
  }

  return (
    <Card className="animate-fadeIn">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="basic" className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                Basic Information
              </TabsTrigger>
              <TabsTrigger value="location" className="flex items-center gap-2 cursor-pointer">
                <MapPin className="h-4 w-4" />
                Location Details
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    placeholder="Use online url or use: /ProfileMap/assets/image_name.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">
                    Occupation <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                    <Input
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Software Engineer"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests</Label>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-gray-400" />
                    <div className="flex-1 flex">
                      <Input
                        id="interests"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Add an interest"
                        className="rounded-r-none"
                      />
                      <Button type="button" onClick={handleAddInterest} className="rounded-l-none cursor-pointer">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {interest}
                        <button
                          type="button"
                          onClick={() => handleRemoveInterest(interest)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {interest}</span>
                        </button>
                      </Badge>
                    ))}
                    {formData.interests.length === 0 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">No interests added yet</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">
                  Bio <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Write a short bio..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" className='cursor-pointer' onClick={() => setActiveTab("location")}>
                  Next: Location Details
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location.street">Street Address</Label>
                  <Input
                    id="location.street"
                    name="location.street"
                    value={formData.location.street}
                    onChange={handleChange}
                    placeholder="123 Main St"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location.city">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location.city"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    placeholder="New York"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location.state">State/Province</Label>
                  <Input
                    id="location.state"
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleChange}
                    placeholder="NY"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location.postalCode">Postal Code</Label>
                  <Input
                    id="location.postalCode"
                    name="location.postalCode"
                    value={formData.location.postalCode}
                    onChange={handleChange}
                    placeholder="10001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location.country">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location.country"
                    name="location.country"
                    value={formData.location.country}
                    onChange={handleChange}
                    placeholder="United States"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  Map Coordinates <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Enter the latitude and longitude coordinates for the map marker
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lat">Latitude</Label>
                    <Input
                      id="lat"
                      name="lat"
                      type="number"
                      step="any"
                      value={formData.location.coordinates.lat || ""}
                      onChange={handleCoordinateChange}
                      placeholder="40.7128"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lng">Longitude</Label>
                    <Input
                      id="lng"
                      name="lng"
                      type="number"
                      step="any"
                      value={formData.location.coordinates.lng || ""}
                      onChange={handleCoordinateChange}
                      placeholder="-74.0060"
                      required
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Tip: You can find coordinates by right-clicking on Google Maps and selecting "What's here?"
                </p>
              </div>

              <div className="block md:flex justify-between gap-2 pt-4">
                <Button type="button" variant="outline" className='cursor-pointer' onClick={() => setActiveTab("basic")}>
                  Back: Basic Information
                </Button>

                <div className="flex gap-2 mt-3 md:mt-0 justify-between">
                  <Button type="button" variant="outline" className='cursor-pointer' onClick={onCancel}>
                    Cancel
                  </Button>

                  <Button type="submit" disabled={isSubmitting || !isFormValid()} className="min-w-[100px] cursor-pointer">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2 cursor-pointer" />
                        {profile ? "Update" : "Create"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
    </Card>
  )
}
