import { api } from "@/lib/api/axios";
import { Furniture } from "@/types/furniture.interface";
// import axios from "axios";

export const furnitureService = {
    async getAll() {
        const response = await api.get<Furniture[]>('/furniture?limit=100')
        return response.data;
    },

    async getById(id: string) {
        const response = await api.get<Furniture>(`/furniture/${id}`);
        return response.data;
    },

    async create(furniture: Omit<Furniture, 'id' | 'isActive'>) {
        try {
            const response = await api.post<Furniture>('/furniture', furniture);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    },

    async update(id: string, furniture: Partial<Furniture>) {
        const response = await api.patch<Furniture>(`/furniture/${id}`, furniture);
        return response.data;
    },
    
    //TODO: Implement markInactive later
    // async markInactive(id: string) {
    //     const response = await api.delete<Furniture>(`/furniture/${id}`);
    //     return response.data;
    // }
}