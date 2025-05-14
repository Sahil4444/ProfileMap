"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Mail,
  Phone,
  Briefcase,
  MapIcon,
  UserRound,
} from "lucide-react";
import avatar from "/a1.jpg";
import placeHolderJpg from "/placeholder.svg";

export function ProfileList({
  profiles,
  viewMode,
  onProfileSelect,
  onProfileClick,
}) {
  const [hoveredId, setHoveredId] = useState(null);

  if (profiles.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No profiles found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className={`overflow-hidden py-2 transition-all duration-300 hover:shadow-lg animate-scale-up ${
              hoveredId === profile.id
                ? "ring-2 ring-emerald-500 ring-offset-2"
                : ""
            }`}
            onMouseEnter={() => setHoveredId(profile.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className="aspect-square relative cursor-pointer"
              onClick={() => onProfileClick(profile)}
            >
              <img
                src={profile.avatar || placeHolderJpg}
                alt={profile.name}
                className="object-cover h-100 w-100 transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3
                className="font-semibold text-lg mb-1 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                onClick={() => onProfileClick(profile)}
              >
                {profile.name}
              </h3>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                <MapPin className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {profile.location.city}, {profile.location.country}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-2">
                {profile.bio}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {profile.interests.slice(0, 3).map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
                {profile.interests.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{profile.interests.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-around">
              <Button
                variant="outline"
                size="sm"
                className="w-fit cursor-pointer"
                onClick={() => onProfileSelect(profile)}
              >
                <MapIcon className="h-4 w-4 mr-2" />
                View on Map
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-fit cursor-pointer"
                onClick={() => onProfileClick(profile)}
              >
                <UserRound className="h-4 w-4 mr-2" />
                About Me
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <Card
          key={profile.id}
          className={`overflow-hidden transition-all duration-300 hover:shadow-md animate-scale-up ${
            hoveredId === profile.id ? "ring-1 ring-emerald-500" : ""
          }`}
          onMouseEnter={() => setHoveredId(profile.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="flex flex-col sm:flex-row items-center px-4">
            <div
              className="sm:w-[120px] h-[120px] relative cursor-pointer flex items-center justify-center"
              onClick={() => onProfileClick(profile)}
            >
              <img
                src={profile.avatar || placeHolderJpg}
                alt={profile.name}
                className="object-cover h-30 w-30 rounded-full"
              />
            </div>
            <div className="flex-1 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3
                  className="font-semibold text-lg cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  onClick={() => onProfileClick(profile)}
                >
                  {profile.name}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1 sm:mt-0">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    {profile.location.city}, {profile.location.country}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                {profile.bio}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Mail className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                  <span className="truncate max-w-[150px]">
                    {profile.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                  <span>{profile.occupation}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-3 sm:gap-0">
                <div className="flex flex-wrap gap-1">
                  {profile.interests.slice(0, 2).map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                  {profile.interests.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{profile.interests.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit cursor-pointer"
                    onClick={() => onProfileClick(profile)}
                  >
                    <UserRound className="h-4 w-4 mr-2" />
                    About Me
                  </Button>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    size="sm"
                    onClick={() => onProfileSelect(profile)}
                  >
                    <MapIcon className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
