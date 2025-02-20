import { Furniture } from "./furniture.interface"

export interface ComboFurniture {
    id: string
    comboId: string
    furnitureId: string
    quantity: number
    furniture: Furniture
}