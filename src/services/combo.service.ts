import { api } from "@/lib/api/axios";
import { Combo } from "@/types/combo.interface";
import { CreateComboDto } from "@/types/createComboDTO.interface";

export const combosService = {
    async getAll() {
        const response = await api.get<Combo[]>('/combo');
        return response.data;
    },

    async getById(id: string) {
        const response = await api.get<Combo>(`/combo/${id}`)
        return response.data;
    },
    
    async create(combo: CreateComboDto) {
        const response = await api.post<Combo>('/combo', combo);
        return response.data;
    },

    async update(id: string, combo: Partial<CreateComboDto>) {
        const response = await api.patch<Combo>(`/combo/${id}`, combo);
        return response.data;
    }
}
