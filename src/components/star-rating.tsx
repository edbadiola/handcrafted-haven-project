"use client";

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  onRate?: (rating: number) => void;
  readonly?: boolean;
}

export function StarRating({
  rating,
  totalStars = 5,
  size = 20,
  className,
  onRate,
  readonly = true,
}: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            size={size}
            className={cn(
              'transition-colors',
              starValue <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300',
              !readonly && 'cursor-pointer'
            )}
            onClick={() => onRate && !readonly && onRate(starValue)}
          />
        );
      })}
    </div>
  );
}
