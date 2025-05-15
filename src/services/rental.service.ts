import { api } from "@/lib/api/axios";
// TODO
//import { Rental } from "@/types/rental.interface";
import axios from "axios";
import { Rental } from "@/types/rental.interface";

export const rentalsService = {

    //Get all rentals
    async getAll() {
        const response = await api.get<Rental[]>('/rental')
        return response.data;
    }
}