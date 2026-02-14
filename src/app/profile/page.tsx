'use client';

import { useAppContext } from '@/context/app-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, Trash2 } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import Link from 'next/link';

const profileFormSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
});

export default function ProfilePage() {
  const { user, products, updateUser, removeProduct } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setAvatarPreview(user.avatarUrl || null);
    }
  }, [user, router]);

  const userProducts = useMemo(() => {
    if (!user) return [];
    return products.filter(p => p.sellerId === user.id);
  }, [products, user]);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: user?.displayName || '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ displayName: user.displayName });
    }
  }, [user, form]);

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    if (!user) return;
    updateUser({ displayName: values.displayName });
    toast({
      title: 'Profile Updated',
      description: 'Your display name has been updated.',
    });
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setAvatarPreview(dataUrl);
        if (user) {
          updateUser({ avatarUrl: dataUrl });
          toast({
            title: 'Avatar Updated',
            description: 'Your new avatar has been saved.',
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
    toast({
        title: 'Product Removed',
        description: 'The product has been removed from your listings.',
    });
  };

  if (!user) {
    return (
      <div className="container flex items-center justify-center py-12">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          My Profile
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Manage your account settings and product listings.
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Edit Profile</CardTitle>
              <CardDescription>Update your public information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={avatarPreview || ''} alt={user.displayName} />
                            <AvatarFallback>
                                <UserIcon className="h-12 w-12" />
                            </AvatarFallback>
                        </Avatar>
                    </label>
                    <Input id="avatar-upload" type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
                    <Button asChild variant="outline">
                        <label htmlFor="avatar-upload">Change Picture</label>
                    </Button>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onProfileSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Display Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Your Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Save Changes</Button>
                    </form>
                </Form>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
            <h2 className="font-headline text-2xl font-bold mb-6">My Product Listings</h2>
            {userProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {userProducts.map(product => (
                        <div key={product.id} className="relative group">
                            <ProductCard product={product} />
                            <Button 
                                variant="destructive" 
                                size="icon" 
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                onClick={() => handleRemoveProduct(product.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                 <Card className="flex flex-col items-center justify-center text-center py-20">
                     <CardHeader>
                        <CardTitle>No Products Yet</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">You haven't listed any products for sale.</p>
                        <Button asChild className="mt-6">
                            <Link href="/add-product">Add Your First Product</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
