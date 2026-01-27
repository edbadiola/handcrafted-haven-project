import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SellerLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-12">
        <Skeleton className="h-32 w-32 md:h-40 md:w-40 rounded-full" />
        <div className="flex-1 text-center md:text-left space-y-3">
          <Skeleton className="h-12 w-1/2 mx-auto md:mx-0" />
          <Skeleton className="h-5 w-1/4 mx-auto md:mx-0" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full max-w-2xl mx-auto md:mx-0" />
            <Skeleton className="h-4 w-full max-w-2xl mx-auto md:mx-0" />
            <Skeleton className="h-4 w-4/5 max-w-2xl mx-auto md:mx-0" />
          </div>
        </div>
      </div>

      <Separator />

      <div className="mt-12">
        <Skeleton className="h-10 w-1/3 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="p-0">
                <Skeleton className="aspect-square w-full" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
