"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu, Sparkles } from "lucide-react";
import { sellers } from "@/lib/data";

export function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const routes = [
    {
      href: `/`,
      label: "All Products",
      active: pathname === `/`,
    },
    {
      href: `/sellers/${sellers[0].id}`,
      label: "Our Artisans",
      active: pathname.startsWith(`/sellers`),
    },
  ];

  return (
    <>
      <nav className="hidden items-center space-x-4 md:flex lg:space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setOpen(false)}>
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">Handcrafted Haven</span>
              </Link>
              <div className="flex flex-col space-y-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary p-2 rounded-md",
                      route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
