import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Handcrafted Haven',
  description: 'Learn more about the story and mission of Handcrafted Haven.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          About Handcrafted Haven
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Connecting you with the heart and soul of craftsmanship.
        </p>
      </header>

      <div className="max-w-4xl mx-auto prose prose-stone dark:prose-invert text-foreground lg:prose-lg">
        <p>
          Welcome to Handcrafted Haven, your curated marketplace for authentic,
          beautifully crafted goods from talented artisans around the world. Our
          journey began with a simple belief: that the things we own should have
          a story, a touch of human hands, and a soul.
        </p>
        <p>
          In a world of mass production, we felt a growing disconnect from the
          products we use every day. We yearned for items with character and
          purpose, created with passion and skill. That yearning sparked the
          idea for Handcrafted Haven—a place to celebrate the maker, to honor
          traditional techniques, and to bring unique, high-quality pieces into
          your home.
        </p>
        <p>
          Our mission is twofold: to provide artisans with a platform to share
          their craft and reach a wider audience, and to offer you, our
          customer, a collection of goods that are not only beautiful but also
          meaningful. Every product on our site is hand-selected, ensuring it
          meets our standards of quality, originality, and ethical production.
        </p>
        <p>
          When you purchase from Handcrafted Haven, you're not just buying an
          item; you're supporting a small business, sustaining a craft, and
          becoming part of an artisan's story. Thank you for joining us on this
          journey.
        </p>
      </div>
    </div>
  );
}
