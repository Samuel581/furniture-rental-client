import { Client } from "./user.interface"
import { Furniture } from "./furniture.interface"
import { Combo } from "./combo.interface"

export interface Rental {
    id: string
    clientId: string
    startDate: string
    endDate: string
    rentalStatus: string
    totalAmount: string
    depositAmount: string
    notes: string
    secondaryDeliveryAddress: any
    client: Client
    rentalItems: RentalItem[]
  }
  
  export interface RentalItem {
    id: string
    rentalId: string
    quantity: number
    furnitureId?: string
    comboId?: string
    furniture?: Furniture
    combo?: Combo
  }
  