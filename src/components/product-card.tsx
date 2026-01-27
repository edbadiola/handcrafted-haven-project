import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { StarRating } from "./star-rating";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === product.imageIds[0]);

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="flex-grow">
        <CardHeader className="p-0">
          <div className="relative aspect-square w-full">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">No Image</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-headline text-lg font-semibold leading-tight">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={product.rating} size={16} />
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-lg font-semibold">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground">{product.category}</p>
      </CardFooter>
    </Card>
  );
}
