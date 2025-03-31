import React from "react";
import { XIcon } from "lucide-react";

interface FurnitureItem {
  quantity: number;
  name: string;
  onRemove: () => void;
}

const FurnitureItemCard: React.FC<FurnitureItem> = ({ name, quantity, onRemove }) => {
  return (
    <div className="bg-blue-200 shadow-md rounded-md p-2 w-40 relative">
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-gray-600">Cantidad: {quantity}</p>
      </div>
      <button type="button" className="absolute top-1 right-1" onClick={onRemove}>
        <XIcon />
      </button>
    </div>
  );
};

export default FurnitureItemCard;
