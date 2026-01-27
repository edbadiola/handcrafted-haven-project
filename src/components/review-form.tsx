'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/star-rating';

export function ReviewForm() {
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Review submitted with rating:', rating);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label htmlFor="review-name">Name</Label>
            <Input id="review-name" placeholder="Your name" />
          </div>
          <div className="space-y-1">
            <Label>Rating</Label>
            <StarRating rating={rating} readonly={false} onRate={setRating} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="review-title">Review Title</Label>
            <Input id="review-title" placeholder="A short summary" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="review-comment">Comment</Label>
            <Textarea
              id="review-comment"
              placeholder="Share your thoughts about the product"
            />
          </div>
          <Button className="w-full" type="submit">
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
