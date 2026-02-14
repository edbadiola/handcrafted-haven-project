'use client';

import { useAppContext } from '@/context/app-context';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

export default function CartPage() {
  const { user, cart, products, removeFromCart, updateCartQuantity } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const cartItems = useMemo(() => {
    if (!cart) return [];
    return Object.entries(cart)
      .map(([productId, quantity]) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return null;
        return { ...product, quantity };
      })
      .filter(Boolean);
  }, [cart, products]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item!.price * item!.quantity, 0);
  }, [cartItems]);

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
          Your Shopping Cart
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Review the items in your cart before you checkout.
        </p>
      </header>

      {cartItems.length === 0 ? (
         <div className="flex items-center justify-center">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle>Your Cart is Empty</CardTitle>
                </CardHeader>
                <CardContent>
                    <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                        Looks like you haven't added any items to your cart yet.
                    </p>
                     <Button asChild className="mt-6">
                        <Link href="/">Start Shopping</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="divide-y">
                {cartItems.map(item => item && (
                  <div key={item.id} className="flex items-center gap-4 py-4">
                    <Image src={item.imageUrls[0]} alt={item.name} width={80} height={80} className="rounded-md object-cover" />
                    <div className="flex-1">
                      <Link href={`/products/${item.id}`} className="font-semibold hover:underline">{item.name}</Link>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateCartQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                        <Input
                            type="number"
                            className="w-16 h-8 text-center"
                            value={item.quantity}
                            onChange={(e) => {
                                const newQuantity = parseInt(e.target.value, 10);
                                if (!isNaN(newQuantity) && newQuantity > 0) {
                                    updateCartQuantity(item.id, newQuantity);
                                }
                            }}
                        />
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive mt-2" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                 <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
