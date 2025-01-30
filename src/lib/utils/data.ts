// data/mockUsers.ts
import { Client } from "@/types/user.interface";

export const mockClient: Client = {
    id: "CLT001",
    name: "Sarah Johnson",
    phone: ["+1 (555) 123-4567"],
    latitude: 40.7128,
    longitude: -74.0060,
    addressReference: "Blue Building, 5th Floor, Suite 505",
    notes: "Prefers morning appointments",
    isActive: true
  };