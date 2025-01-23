import DashboardRows from "@/components/dashboard/dashboard-rows";
import TotalsRow from "@/components/dashboard/totals-row";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import React from "react";

function page() {
  return (
    <div className="flex flex-col space-y-auto m-10 gap-16">
      <Breadcrumb>
        <BreadcrumbItem><BreadcrumbLink>Dashboard</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
      <TotalsRow />
      <DashboardRows />
    </div>
  );
}

export default page;
