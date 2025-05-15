"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { JSX } from "react";
import { ChevronRight } from "lucide-react";

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter((path) => path);
    const breadcrumbs: JSX.Element[] = [];
    let href = "";

    paths.forEach((path, index) => {
      href += `/${path}`;
      const isLast = index === paths.length - 1;
      const title = path.charAt(0).toUpperCase() + path.slice(1);

      breadcrumbs.push(
        <BreadcrumbItem key={href}>
          {isLast ? (
            <BreadcrumbPage>{title}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
          )}
        </BreadcrumbItem>
      );

      if (!isLast) {
        breadcrumbs.push(
          <ChevronRight key={`separator-${href}`} className="mx-2" />
        );
      }
    });

    return breadcrumbs;
  };

  return (
    <Breadcrumb className="flex items-center">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      {pathname !== "/" && (
        <ChevronRight key="separator-home" className="mx-2" />
      )}
      {generateBreadcrumbs()}
    </Breadcrumb>
  );
}
