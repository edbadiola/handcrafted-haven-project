import { notFound } from 'next/navigation';
import Image from 'next/image';
import { sellers, products as allProducts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProductCard } from '@/components/product-card';
import { Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

async function getSellerData(id: string) {
    const seller = sellers.find(s => s.id === id);
    if (!seller) return null;

    const products = allProducts.filter(p => p.sellerId === id);
    const avatar = PlaceHolderImages.find(img => img.id === seller.avatarId);

    return { seller, products, avatar };
}


export default async function SellerPage({ params }: { params: { id: string } }) {
    const data = await getSellerData(params.id);

    if (!data) {
        notFound();
    }

    const { seller, products, avatar } = data;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-12">
                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-card shadow-lg">
                    {avatar ? (
                        <AvatarImage src={avatar.imageUrl} alt={seller.name} data-ai-hint={avatar.imageHint} />
                    ) : (
                        <Sparkles className="w-16 h-16 text-muted-foreground" />
                    )}
                    <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">{seller.name}</h1>
                    <p className="text-sm text-muted-foreground mt-2">Artisan since {new Date(seller.joined).getFullYear()}</p>
                    <article className="prose prose-stone dark:prose-invert max-w-2xl mt-4 mx-auto md:mx-0">
                        <p>{seller.story}</p>
                    </article>
                </div>
            </div>

            <Separator />
            
            <div className="mt-12">
                <h2 className="font-headline text-3xl font-bold mb-8 text-center md:text-left">Creations by {seller.name}</h2>
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center">This artisan hasn't listed any products yet.</p>
                )}
            </div>
        </div>
    );
}
