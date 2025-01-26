import DashboardRows from "@/components/dashboard/dashboard-rows";
import TotalsRow from "@/components/dashboard/totals-row";
import React from "react";

function page() {
  return (
    <div className="flex flex-col space-y-auto m-10 gap-16">
      <TotalsRow />
      <DashboardRows />
    </div>
  );
}

export default page;
