// import CardWrapper from '@/app/ui/dashboard/cards';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// import { lusitana } from '@/app/ui/fonts';
// import { Suspense } from 'react';
// import {
//   RevenueChartSkeleton,
//   LatestInvoicesSkeleton,
//   CardsSkeleton,
// } from '@/app/ui/skeletons';

import Card from '@/app/ui/dashboard/restaurant-card';
import GridList from '@/app/ui/dashboard/gridlist';

export default async function Page() {
  const cards = [
    { 
        title: 'Card 1', 
        description: 'This is the description of Card 1.', 
        imageUrl: 'https://example.com/image1.jpg' 
    },
    { 
        title: 'Card 2', 
        description: 'This is the description of Card 2.', 
        imageUrl: 'https://example.com/image2.jpg' 
    },
    { 
        title: 'Card 3', 
        description: 'This is the description of Card 3.', 
        imageUrl: 'https://example.com/image3.jpg' 
    },
    { 
        title: 'Card 4', 
        description: 'This is the description of Card 4.', 
        imageUrl: 'https://example.com/image4.jpg' 
    },
    { 
      title: 'Card 5', 
      description: 'This is the description of Card 5.', 
      imageUrl: 'https://example.com/image5.jpg' 
    }
  ];

  return (
    <main>
      <div className="grow p-6 md:overflow-y-auto md:p-12">
          <GridList cards={cards} />
      </div>
    </main>
  );
}