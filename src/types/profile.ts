export interface Profile {
  id: string
  name: string
  email: string
  phone: string
  occupation: string
  bio: string
  avatar: string
  joinedDate: string
  interests: string[]
  location: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
}
