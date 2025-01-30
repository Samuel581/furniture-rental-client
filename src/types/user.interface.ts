export interface Client {
    id: string
    name: string
    phone: string[]
    latitude: number
    longitude: number
    addressReference: string
    notes?: string
    isActive: boolean
  }