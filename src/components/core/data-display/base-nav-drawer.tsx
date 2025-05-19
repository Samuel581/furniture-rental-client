"use client";

import * as React from "react";
import { Minus, Plus, AlignJustify, X } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils/utils";

const routes = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Furniture", href: "/furniture" },
  { label: "Combos", href: "/combos" },
  { label: "Rentals", href: "/rentals" },
  { label: "Clients", href: "/clients" },
];

export function BaseDrawer() {
  const pathname = usePathname()
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button className="md:hidden">
          <AlignJustify />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-3/4">
        <div className="h-screen">
          <DrawerHeader>
              <DrawerTitle >Furniture Rental</DrawerTitle>
              {/* <DrawerClose asChild>
                <Button variant={"ghost"}>
                  <X />
                </Button>
              </DrawerClose> */}
          </DrawerHeader>
          <div className="space-y-1 px-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start"
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>

          <div className="p-4 pb-0"></div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
