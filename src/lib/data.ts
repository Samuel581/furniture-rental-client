// data/mockUsers.ts
import { Client } from "@/interfaces/user.interface";
import { User } from "@/types/user";
export const mockUsers: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "User" },
];

export const mockClient: Client = {
    id: "CLT001",
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    latitude: 40.7128,
    longitude: -74.0060,
    addressReference: "Blue Building, 5th Floor, Suite 505",
    notes: "Prefers morning appointments",
    isActive: true
  };