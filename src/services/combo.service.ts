import { api } from "@/lib/api/axios";
import { Combo } from "@/types/combo.interface";
import { CreateComboDto } from "@/types/createComboDTO.interface";
import axios from "axios";

export const combosService = {
    async getAll() {
        const response = await api.get<Combo[]>('/combo');
        return response.data;
    },

    async getById(id: string) {
        const response = await api.get<Combo>(`/combo/${id}`)
        checkErrors(response);
        return response.data;
    },
    
    async create(combo: CreateComboDto) {
        const response = await api.post<Combo>('/combo', combo);
        if (response.status === 201) {
            return response.data;
        }
    }
}

const checkErrors = (error: unknown) => {
    console.log('Axios errors: ' )
    if (axios.isAxiosError(error) && error.response) {
        console.error('Server response:', error.response.data);
        console.error('Status code:', error.response.status);
    }
    throw error;
}