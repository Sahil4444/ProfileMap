"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProfiles } from "@/hooks/use-profiles"
import { Navbar } from "@/components/navbar"
import { AdminProfileList } from "@/components/admin-profile-list"
import { ProfileForm } from "@/components/profile-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Users, UserPlus, Loader2 } from "lucide-react"

export default function AdminPage() {
  const navigate = useNavigate()
  const { profiles, loading, error, addProfile, updateProfile, deleteProfile } = useProfiles()
  const [editingProfile, setEditingProfile] = useState(null)
  const [activeTab, setActiveTab] = useState("profiles")

  const handleAddProfile = (profile) => {
    addProfile(profile)
    setActiveTab("profiles")
  }

  const handleUpdateProfile = (profile) => {
    updateProfile(profile)
    setEditingProfile(null)
    setActiveTab("profiles")
  }

  const handleEditProfile = (profile) => {
    setEditingProfile(profile)
    setActiveTab("add-edit")
  }

  const handleCancelEdit = () => {
    setEditingProfile(null)
    setActiveTab("profiles")
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <div className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">Error: {error}</div>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">Admin Dashboard</h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Loader2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400 animate-spin mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">Loading profiles...</p>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-fadeIn">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="profiles" className="flex items-center justify-center gap-2 cursor-pointer">
                <Users className="h-4 w-4" />
                Manage Profiles
              </TabsTrigger>
              <TabsTrigger value="add-edit" className="flex items-center justify-center gap-2 cursor-pointer">
                <UserPlus className="h-4 w-4" />
                {editingProfile ? "Edit Profile" : "Add Profile"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profiles" className="mt-0">
              {profiles && profiles.length > 0 ? (
                <AdminProfileList profiles={profiles} onEdit={handleEditProfile} onDelete={deleteProfile} />
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No profiles yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Get started by creating a new profile</p>
                  <Button onClick={() => setActiveTab("add-edit")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Profile
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="add-edit" className="mt-0">
              <ProfileForm
                profile={editingProfile}
                onSubmit={editingProfile ? handleUpdateProfile : handleAddProfile}
                onCancel={handleCancelEdit}
              />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}
