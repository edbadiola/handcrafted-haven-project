'use client';

import { use, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sellers, reviews as allReviews } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/star-rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { ReviewForm } from "@/components/review-form";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { useAppContext } from "@/context/app-context";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products } = useAppContext();
  
  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);

  if (!product) {
    notFound();
  }

  const seller = sellers.find((s) => s.id === product.sellerId);
  const reviews = allReviews.filter((r) => r.productId === product.id);
  
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="md:sticky top-24 self-start">
          <Carousel className="w-full">
            <CarouselContent>
              {product.imageUrls.map((imageUrl, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={imageUrl}
                        alt={`${product.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          
          {seller && (
             <Link href={`/sellers/${seller.id}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors my-2 group">
                <span className="font-medium text-lg">{seller.name}</span>
             </Link>
          )}

          <div className="flex items-center gap-2 mt-2 mb-4">
            <StarRating rating={averageRating} />
            <span className="text-muted-foreground text-sm">({reviews.length} reviews)</span>
          </div>
          
          <p className="text-3xl font-semibold mb-6">${product.price.toFixed(2)}</p>

          <article className="prose prose-stone dark:prose-invert max-w-none text-foreground">
            <p>{product.description}</p>
          </article>

          <AddToCartButton product={product} />
        </div>
      </div>

      <Separator className="my-12" />

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="font-headline text-2xl font-bold mb-6">Reviews & Ratings</h2>
          <div className="space-y-6">
            {reviews.length > 0 ? reviews.map(review => (
              <Card key={review.id}>
                <CardHeader className="flex flex-row items-start gap-4">
                  <Avatar>
                    <AvatarFallback>
                        <User className="w-5 h-5 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                      <StarRating rating={review.rating} size={16} />
                    </div>
                    <h4 className="font-semibold mt-2">{review.title}</h4>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            )) : (
              <p className="text-muted-foreground">No reviews yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>
        <div>
          <ReviewForm />
        </div>
      </div>
    </div>
  );
}
