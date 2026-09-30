import { api } from "@/lib/api/axios";
import { Rental } from "@/types/rental.interface";
import { CreateRentalDto } from "@/types/createRentalDTO.interface";

export const rentalsService = {

    //Get all rentals
    async getAll() {
        const response = await api.get<Rental[]>('/rental')
        return response.data;
    },

    async create(rental: CreateRentalDto) {
        const response = await api.post<Rental>('/rental', rental);
        return response.data;
    }
}
