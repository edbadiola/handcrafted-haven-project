'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/app-context';

interface AddToCartButtonProps {
    product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { user, addToCart } = useAppContext();
    const router = useRouter();
    const { toast } = useToast();

    const handleAddToCart = () => {
        if (!user) {
            router.push('/login');
            return;
        }
        
        addToCart(product.id, 1);

        toast({
            title: 'Added to cart',
            description: `${product.name} has been added to your cart.`,
        });
    };

    return (
        <Button
            size="lg"
            className="w-full mt-6"
            onClick={handleAddToCart}
        >
           Add to Cart
        </Button>
    );
}
