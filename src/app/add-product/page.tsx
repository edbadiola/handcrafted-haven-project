'use client';

import { useAppContext } from '@/context/app-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/data';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().min(1, 'An image is required'),
});

export default function AddProductPage() {
  const { user, addProduct } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      category: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;

    addProduct({
      id: `prod-${Date.now()}`,
      name: values.name,
      description: values.description,
      price: values.price,
      imageUrls: [values.imageUrl],
      sellerId: user.id,
      category: values.category as any,
      rating: 0,
      reviewCount: 0,
    });

    toast({
      title: 'Product Added!',
      description: `${values.name} has been added to the store.`,
    });
    router.push('/');
  }

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
          Add a New Product
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Fill out the form below to list a new item in your shop.
        </p>
      </header>
       <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Product Details</CardTitle>
          <CardDescription>
            Provide the information for the product you want to sell.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Hand-Woven Rattan Basket" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g. 49.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your product in detail." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                       </FormControl>
                      <SelectContent>
                         {categories.map((cat) => (
                           <SelectItem key={cat} value={cat}>
                             {cat}
                           </SelectItem>
                         ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    {imagePreview && (
                        <div className="mt-2 rounded-md overflow-hidden w-48 h-48 relative">
                            <Image src={imagePreview} alt="Image Preview" layout="fill" objectFit="cover" />
                        </div>
                    )}
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                           const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    const dataUrl = reader.result as string;
                                    setImagePreview(dataUrl);
                                    field.onChange(dataUrl);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Add Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
