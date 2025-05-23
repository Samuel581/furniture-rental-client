import React from "react";
import Sidebar from "./sidebar";
import { DynamicBreadcrumb } from "./dynamic-breadcrumb";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <div className="p-4 border-b">
          <DynamicBreadcrumb />
        </div>
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
