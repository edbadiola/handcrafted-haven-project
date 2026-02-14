'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
import {
  Sparkles,
  Home,
  Users,
  LogIn,
  UserPlus,
  Info,
  ShoppingCart,
  LogOut,
  PlusCircle,
  User,
} from 'lucide-react';
import { useAppContext } from '@/context/app-context';


export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAppContext();
  const router = useRouter();

  const handleSignOut = async () => {
    logout();
    router.push('/'); // Redirect to home page after sign out
  };

  const routes = [
    {
      href: `/`,
      label: 'Home',
      icon: Home,
      active: pathname === `/`,
    },
    {
      href: `/sellers`,
      label: 'Discover our Artisan',
      icon: Users,
      active: pathname.startsWith(`/sellers`),
    },
    {
      href: `/about`,
      label: 'About',
      icon: Info,
      active: pathname === `/about`,
    },
  ];

  const userRoutes = [
     {
      href: `/profile`,
      label: 'My Profile',
      icon: User,
      active: pathname === `/profile`,
    },
    {
      href: `/cart`,
      label: 'My Cart',
      icon: ShoppingCart,
      active: pathname === `/cart`,
    },
    {
      href: `/add-product`,
      label: 'Add Product',
      icon: PlusCircle,
      active: pathname === `/add-product`,
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
          {user &&
            userRoutes.map((route) => (
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
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <div className="flex flex-col gap-2">
          {!user ? (
            <>
              <Button
                variant="default"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link href="/login">
                  <LogIn /> <span>Sign In</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link href="/create-account">
                  <UserPlus /> <span>Create Account</span>
                </Link>
              </Button>
            </>
          ) : (
             <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={handleSignOut}
            >
              <LogOut /> <span>Sign Out</span>
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
