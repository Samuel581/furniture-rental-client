export interface CreateRentalDto {
  clientId: string;
  startDate: string;
  endDate: string;
  depositAmount?: number;
  notes?: string;
  secondaryDeliveryAddress?: string;
  items: Array<{
    quantity: number;
    furnitureId?: string;
    comboId?: string;
  }>;
}
