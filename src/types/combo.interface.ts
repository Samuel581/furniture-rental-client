import { ComboFurniture } from "./comboFurniture.interface"

export interface Combo {
    id: string
    name: string
    dailyRate: number
    isActive: boolean
    ComboFurniture: ComboFurniture[]
}