"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter((path) => path);
    let breadcrumbs: any = [];
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
          <BreadcrumbSeparator key={`${href}-separator`} className="mx-2" />
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
        <BreadcrumbSeparator className="mx-2"/>
      )}
      {generateBreadcrumbs()}
    </Breadcrumb>
  );
}
