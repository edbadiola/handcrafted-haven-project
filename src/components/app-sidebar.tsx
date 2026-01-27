'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Sparkles, Home, Users, LogIn, LogOut, ShoppingCart } from 'lucide-react';
import { sellers } from '@/lib/data';

export function AppSidebar() {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: 'Home',
      icon: Home,
      active: pathname === `/`,
    },
    {
      href: `/sellers/${sellers[0].id}`,
      label: 'Our Artisans',
      icon: Users,
      active: pathname.startsWith(`/sellers`),
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
         <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <span className="text-lg font-semibold font-headline">
                Handcrafted Haven
            </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton
                asChild
                isActive={route.active}
                tooltip={{ children: route.label }}
              >
                <Link href={route.href}>
                  <route.icon />
                  <span>{route.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={{ children: 'Cart' }}>
                    <ShoppingCart />
                    <span>Cart</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <div className="flex flex-col gap-2">
            <Button variant="default" className="w-full justify-start gap-2">
                <LogIn /> <span>Sign In</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
                <LogOut /> <span>Sign Out</span>
            </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
