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

import GridList from '@/app/ui/dashboard/gridlist';
import { getAllRestaurants } from '@/scripts/business';

export default async function Page() {
  try {
    const restaurants = await getAllRestaurants();

    return (
      <main>
        <div className="grow p-6 md:overflow-y-auto md:p-12">
          <GridList cards={restaurants.map(restaurant => ({
            title: restaurant.name,
            description: restaurant.description,
            imageUrl: "/empty.jpg", // Needs to be updated later with actual images from database
            restaurantId: restaurant.id
          }))} />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return null;
  }
}