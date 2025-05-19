"use client";

import * as React from "react";
import { Minus, Plus, AlignJustify, X } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

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

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function BaseDrawer() {
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
              <DrawerTitle >Modules</DrawerTitle>
              {/* <DrawerClose asChild>
                <Button variant={"ghost"}>
                  <X />
                </Button>
              </DrawerClose> */}
          </DrawerHeader>

          <div className="p-4 pb-0"></div>
          <DrawerFooter>
            <Button>Submit</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
