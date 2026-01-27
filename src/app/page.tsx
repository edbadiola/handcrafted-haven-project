"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { products as allProducts, categories } from "@/lib/data";
import type { Product } from "@/lib/types";
import { Label } from "@/components/ui/label";

export default function BrowsePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number]>([500]);

  useEffect(() => {
    // Simulate fetching data
    setProducts(allProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        return category === "all" || product.category === category;
      })
      .filter((product) => {
        return product.price <= priceRange[0];
      });
  }, [products, category, priceRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Explore Our Handcrafted Collection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find unique treasures, lovingly made by our skilled artisans.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category-select">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category-select" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price-slider">Max Price: ${priceRange[0]}</Label>
                <Slider
                  id="price-slider"
                  min={0}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={(value: [number]) => setPriceRange(value)}
                />
              </div>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setCategory("all");
                  setPriceRange([500]);
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </aside>

        <main className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <h2 className="font-headline text-2xl">No Products Found</h2>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
