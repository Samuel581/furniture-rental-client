import { api } from "@/lib/axios";
import { Client } from "@/interfaces/user.interface";

export const clientsService = {
    // Get all clients
    async getAll() {
      const response = await api.get<Client[]>('/client');
      return response.data;
    },
  
    // Get a single client
    async getById(id: string) {
      const response = await api.get<Client>(`/client/${id}`);
      return response.data;
    },
  
    // Create a new client
    async create(client: Omit<Client, 'id'>) {
      const response = await api.post<Client>('/client', client);
      return response.data;
    },
  
    // Update a client
    async update(id: string, client: Partial<Client>) {
      const response = await api.patch<Client>(`/client/${id}`, client);
      return response.data;
    },
  };