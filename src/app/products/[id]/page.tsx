import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, reviews as allReviews, sellers } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";
import { ReviewForm } from "@/components/review-form";

async function getProductData(id: string) {
  const product = products.find((p) => p.id === id);
  if (!product) return null;

  const seller = sellers.find((s) => s.id === product.sellerId);
  const reviews = allReviews.filter((r) => r.productId === id);
  const images = PlaceHolderImages.filter((img) => product.imageIds.includes(img.id));
  const sellerAvatar = PlaceHolderImages.find(p => p.id === seller?.avatarId);


  return { product, seller, reviews, images, sellerAvatar };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const data = await getProductData(params.id);

  if (!data) {
    notFound();
  }

  const { product, seller, reviews, images, sellerAvatar } = data;
  
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="md:sticky top-24 self-start">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={image.imageUrl}
                        alt={`${product.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
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

          <Button size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">Add to Cart</Button>
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
                    <div className="relative h-full w-full aspect-square bg-muted rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-muted-foreground" />
                    </div>
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
