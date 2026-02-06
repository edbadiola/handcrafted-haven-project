import Link from 'next/link';
import { sellers } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

export default function SellersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Discover our Artisan
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Meet the talented creators behind the handcrafted goods.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
        {sellers.map((seller) => (
          <Link href={`/sellers/${seller.id}`} key={seller.id} className="group">
            <Card className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Avatar className="h-24 w-24 mb-4 border-2 border-transparent group-hover:border-primary transition-colors">
                <AvatarFallback>
                  <User className="w-12 h-12 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <h2 className="font-headline text-xl font-semibold">{seller.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Artisan since {new Date(seller.joined).getFullYear()}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
