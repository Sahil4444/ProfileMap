"use client"

import { useState, useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Loader2 } from "lucide-react"

// This would normally come from an environment variable
// For the demo, we're hardcoding a public token
const MAPBOX_TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN;

export function ProfileMap({ profiles, selectedProfile, onProfileSelect, singleProfileMode = false }) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markers = useRef({})
  const [loading, setLoading] = useState(true)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 20], // Default center
      zoom: 1.5,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

    map.current.on("load", () => {
      setLoading(false)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Add markers for profiles
  useEffect(() => {
    if (!map.current || loading || !profiles.length) return

    // Clear existing markers
    Object.values(markers.current).forEach((marker) => marker.remove())
    markers.current = {}

    // Add new markers
    profiles.forEach((profile) => {
      const { lat, lng } = profile.location.coordinates

      // Create marker element
      const el = document.createElement("div")
      el.className = "flex items-center justify-center"
      el.style.width = "32px"
      el.style.height = "32px"
      el.style.borderRadius = "50%"
      el.style.backgroundColor = selectedProfile?.id === profile.id ? "#10b981" : "#0f766e"
      el.style.border = "2px solid white"
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)"
      el.style.cursor = "pointer"
      el.style.transition = "all 0.3s ease"

      // Inner dot
      const innerDot = document.createElement("div")
      innerDot.style.width = "6px"
      innerDot.style.height = "6px"
      innerDot.style.borderRadius = "50%"
      innerDot.style.backgroundColor = "white"
      el.appendChild(innerDot)

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
          <div class="flex items-center gap-2 p-1">
            <img src="${profile.avatar}" alt="${profile.name}" class="w-10 h-10 rounded-full object-cover" />
            <div>
              <div class="font-semibold text-gray-700">${profile.name}</div>
              <div class="text-xs text-gray-600">${profile.location.city}, ${profile.location.country}</div>
            </div>
          </div>
        `)

      // Create and add marker
      const marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).setPopup(popup).addTo(map.current)

      // Add click event
      marker.getElement().addEventListener("click", () => {
        if (onProfileSelect) {
          onProfileSelect(profile)
        }
      })

      // Store marker reference
      markers.current[profile.id] = marker
    })

    // Fit bounds if we have profiles
    if (profiles.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      profiles.forEach((profile) => {
        const { lat, lng } = profile.location.coordinates
        bounds.extend([lng, lat])
      })

      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: singleProfileMode ? 13 : 10,
      })
    }
  }, [profiles, loading, selectedProfile, onProfileSelect, singleProfileMode])

  // Handle selected profile
  useEffect(() => {
    if (!map.current || loading || !selectedProfile) return

    const { lat, lng } = selectedProfile.location.coordinates

    // Fly to the selected profile
    map.current.flyTo({
      center: [lng, lat],
      zoom: 13,
      speed: 1.5,
      curve: 1.5,
    })

    // Show popup for selected profile
    const marker = markers.current[selectedProfile.id]
    if (marker) {
      marker.togglePopup()
    }

    // Update marker styles
    Object.entries(markers.current).forEach(([id, marker]) => {
      const el = marker.getElement().firstChild
      if (el) {
        if (id === selectedProfile.id) {
          el.style.backgroundColor = "#10b981"
          el.style.width = "40px"
          el.style.height = "40px"
          el.style.zIndex = "10"
        } else {
          el.style.backgroundColor = "#0f766e"
          el.style.width = "32px"
          el.style.height = "32px"
          el.style.zIndex = "1"
        }
      }
    })
  }, [selectedProfile, loading])

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 z-10">
          <Loader2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400 animate-spin" />
        </div>
      )}
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}
