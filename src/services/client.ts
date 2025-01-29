import { api } from "@/lib/axios";
import { Client } from "@/interfaces/user.interface";
import axios from "axios";

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
    
    async create(client: Omit<Client, 'id' | 'isActive'>) {
      const response = await api.post<Client>('/client', client);
      return response.data;
    },
  
    // Update a client
    async update(id: string, client: Partial<Client>) {
      try {
        console.log('Sending update request with data:', client);
        const response = await api.patch<Client>(`/client/${id}`, client);
        return response.data;
      } catch (error) {
        console.error(`Error updating client ${id}:`, error);
        if (axios.isAxiosError(error) && error.response) {
          console.error('Server response:', error.response.data);
          console.error('Status code:', error.response.status);
        }
        throw error;
      }
    }
  };