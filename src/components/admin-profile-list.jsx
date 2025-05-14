"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreHorizontal, Pencil, Trash2, MapPin, Search } from "lucide-react"
import placeHolderJpg from "/placeholder.svg";

export function AdminProfileList({ profiles, onEdit, onDelete }) {
  const [deleteId, setDeleteId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location.country.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (id) => {
    setDeleteId(id)
  }

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteId(null)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 py-2 pr-4 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No profiles found
                </TableCell>
              </TableRow>
            ) : (
              filteredProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={profile.avatar || placeHolderJpg}
                        alt={profile.name}
                        className="object-cover h-10 w-10 rounded-full"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>{profile.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                      <span>
                        {profile.location.city}, {profile.location.country}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{profile.occupation}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className='cursor-pointer' variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(profile)} className='cursor-pointer'>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(profile.id)}
                          className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the profile and remove the data from the
              server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
