import React from "react";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Home, ShoppingBag, Package, ClipboardList } from "lucide-react";

const routes = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Furniture", icon: ShoppingBag, href: "/furniture" },
  { label: "Combos", icon: Package, href: "/combos" },
  { label: "Rentals", icon: ClipboardList, href: "/rentals" },
  { label: "Clients", icon: Users, href: "/clients" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">Furniture Rental</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-gray-800/50 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-gray-800"
                  : "text-gray-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
