"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

import a1 from "./assets/a1.jpg";
import a2 from "./assets/a2.jpg";
import a3 from "./assets/a3.jpg";
import a4 from "./assets/a4.jpg";
import a5 from "./assets/a5.jpg";
import a6 from "./assets/a6.jpg";
import a7 from "./assets/a7.jpg";


// public\a1.jpg

// Mock data for initial profiles
const mockProfiles = [
  {
    id: "1",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 123-4567",
    occupation: "Software Engineer",
    bio: "Emma is a senior software engineer with over 8 years of experience in full-stack development. She specializes in React, Node.js, and cloud architecture. In her free time, she contributes to open-source projects and mentors junior developers.",
    avatar: a1,
    joinedDate: "January 15, 2023",
    interests: ["Programming", "Hiking", "Photography", "Machine Learning"],
    location: {
      street: "123 Tech Avenue",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "United States",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 987-6543",
    occupation: "UX Designer",
    bio: "Michael is a creative UX designer who combines artistic vision with user-centered design principles. With a background in psychology, he brings a unique perspective to creating intuitive and engaging user experiences. He has worked with startups and enterprise clients across various industries.",
    avatar: a2,
    joinedDate: "March 3, 2023",
    interests: ["Design", "Travel", "Cooking", "Psychology"],
    location: {
      street: "456 Design Boulevard",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@example.com",
    phone: "+44 20 1234 5678",
    occupation: "Data Scientist",
    bio: "Sophia is a data scientist with expertise in machine learning and statistical analysis. She has a PhD in Computer Science and has published several papers on AI ethics. She is passionate about using data for social good and has worked on projects related to healthcare and climate change.",
    avatar: a3,
    joinedDate: "February 20, 2023",
    interests: ["AI", "Statistics", "Reading", "Yoga"],
    location: {
      street: "789 Data Drive",
      city: "London",
      state: "",
      postalCode: "EC1V 4PW",
      country: "United Kingdom",
      coordinates: {
        lat: 51.5074,
        lng: -0.1278,
      },
    },
  },
  {
    id: "4",
    name: "Jamal Williams",
    email: "jamal.williams@example.com",
    phone: "+61 2 9876 5432",
    occupation: "Marketing Director",
    bio: "Jamal is a marketing director with over 15 years of experience in digital marketing and brand strategy. He has led successful campaigns for Fortune 500 companies and has a track record of driving growth through innovative marketing approaches. He is also a keynote speaker at industry conferences.",
    avatar: a4,
    joinedDate: "April 10, 2023",
    interests: ["Marketing", "Public Speaking", "Jazz", "Tennis"],
    location: {
      street: "101 Market Street",
      city: "Sydney",
      state: "NSW",
      postalCode: "2000",
      country: "Australia",
      coordinates: {
        lat: -33.8688,
        lng: 151.2093,
      },
    },
  },
  {
    id: "5",
    name: "Aisha Patel",
    email: "aisha.patel@example.com",
    phone: "+91 98765 43210",
    occupation: "Product Manager",
    bio: "Aisha is a product manager with a passion for creating products that solve real-world problems. With a background in engineering and an MBA, she bridges the gap between technical and business aspects of product development. She has launched several successful products in the fintech space.",
    avatar: a5,
    joinedDate: "May 5, 2023",
    interests: ["Product Strategy", "Fintech", "Meditation", "Painting"],
    location: {
      street: "234 Product Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
      coordinates: {
        lat: 12.9716,
        lng: 77.5946,
      },
    },
  },
  {
    id: "6",
    name: "Lucas Schmidt",
    email: "lucas.schmidt@example.com",
    phone: "+49 30 1234567",
    occupation: "Blockchain Developer",
    bio: "Lucas is a blockchain developer specializing in smart contracts and decentralized applications. He has contributed to several major blockchain projects and is an advocate for web3 technologies. He regularly speaks at tech conferences and runs workshops on blockchain development.",
    avatar: a6,
    joinedDate: "June 15, 2023",
    interests: ["Blockchain", "Cryptocurrency", "Gaming", "Snowboarding"],
    location: {
      street: "567 Blockchain Strasse",
      city: "Berlin",
      state: "",
      postalCode: "10115",
      country: "Germany",
      coordinates: {
        lat: 52.52,
        lng: 13.405,
      },
    },
  },
  {
    id: "7",
    name: "Nadia Kim",
    email: "nadia.kim@example.com",
    phone: "+82 2 1234 5678",
    occupation: "UI/UX Researcher",
    bio: "Nadia is a UI/UX researcher who combines qualitative and quantitative methods to understand user behavior and needs. She has a background in cognitive psychology and has worked with companies across Asia and North America. She is passionate about creating accessible and inclusive digital experiences.",
    avatar: a7,
    joinedDate: "July 7, 2023",
    interests: ["User Research", "Accessibility", "Travel", "Photography"],
    location: {
      street: "890 Research Avenue",
      city: "Seoul",
      state: "",
      postalCode: "06164",
      country: "South Korea",
      coordinates: {
        lat: 37.5665,
        lng: 126.978,
      },
    },
  },
  {
    id: "8",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@example.com",
    phone: "+52 55 1234 5678",
    occupation: "DevOps Engineer",
    bio: "Carlos is a DevOps engineer with expertise in cloud infrastructure, CI/CD pipelines, and containerization. He has helped numerous companies implement efficient and scalable deployment processes. He is also an advocate for site reliability engineering practices and has authored several technical guides.",
    avatar: a3,
    joinedDate: "August 12, 2023",
    interests: ["Cloud Computing", "Automation", "Soccer", "Cooking"],
    location: {
      street: "345 DevOps Street",
      city: "Mexico City",
      state: "",
      postalCode: "06500",
      country: "Mexico",
      coordinates: {
        lat: 19.4326,
        lng: -99.1332,
      },
    },
  },
]

export function useProfiles() {
  const [profiles, setProfiles] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load profiles from localStorage or use mock data
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Try to get profiles from localStorage
        const storedProfiles = localStorage.getItem("profiles")

        if (storedProfiles) {
          setProfiles(JSON.parse(storedProfiles))
        } else {
          // Use mock data for initial load
          setProfiles(mockProfiles)
          // Save mock data to localStorage
          localStorage.setItem("profiles", JSON.stringify(mockProfiles))
        }

        setLoading(false)
      } catch (err) {
        console.error("Error fetching profiles:", err)
        setError("Failed to load profiles. Please try again.")
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  // Add a new profile
  const addProfile = async (profile) => {
    try {
      // Ensure the profile has an ID
      const newProfile = {
        ...profile,
        id: profile.id || uuidv4(),
      }

      // Update state
      setProfiles((prev) => {
        const updated = prev ? [...prev, newProfile] : [newProfile]
        // Save to localStorage
        localStorage.setItem("profiles", JSON.stringify(updated))
        return updated
      })

      return newProfile
    } catch (err) {
      console.error("Error adding profile:", err)
      setError("Failed to add profile. Please try again.")
      throw err
    }
  }

  // Update an existing profile
  const updateProfile = async (profile) => {
    try {
      // Update state
      setProfiles((prev) => {
        if (!prev) return prev

        const updated = prev.map((p) => (p.id === profile.id ? profile : p))
        // Save to localStorage
        localStorage.setItem("profiles", JSON.stringify(updated))
        return updated
      })

      return profile
    } catch (err) {
      console.error("Error updating profile:", err)
      setError("Failed to update profile. Please try again.")
      throw err
    }
  }

  // Delete a profile
  const deleteProfile = async (id) => {
    try {
      // Update state
      setProfiles((prev) => {
        if (!prev) return prev

        const updated = prev.filter((p) => p.id !== id)
        // Save to localStorage
        localStorage.setItem("profiles", JSON.stringify(updated))
        return updated
      })

      return id
    } catch (err) {
      console.error("Error deleting profile:", err)
      setError("Failed to delete profile. Please try again.")
      throw err
    }
  }

  return {
    profiles,
    loading,
    error,
    addProfile,
    updateProfile,
    deleteProfile,
  }
}
