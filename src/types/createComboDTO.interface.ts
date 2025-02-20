export interface CreateComboDto {
    name: string;
    dailyRate: number;
    isActive?: boolean;  // Optional since it has a default value
    furnitureItems: Array<{
      furnitureId: string;
      quantity: number;
    }>;
  }