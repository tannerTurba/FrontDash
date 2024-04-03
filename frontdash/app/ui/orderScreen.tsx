'use client';

import { useState } from 'react';
import { getOrders } from '@/scripts/order';


export default async function page() {
  try {
    const businessId = '53';
    const orders = await getOrders(businessId);
   
    return (
      <main>
      <div>
        <h1 className="text-2xl font-bold mb-4"> Orders </h1>
        <div className="flex flex-wrap gap-4">
          {orders.map((order) => (
            <div key={order.id} className="grow rounded-lg bg-gray-50 p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-gray-900 dark:hover:bg-sky-900 dark:hover:text-blue-400">
              <h2 className="text-lg font-bold">Id</h2>
              <div>{order.id}</div>
              <h2 className="text-lg font-bold">Price</h2>
              <div>{order.price}</div>
              <h2 className="text-lg font-bold">Status</h2>
              <div>{order.status}</div>
              <h2 className="text-lg font-bold">Order Time</h2>
              <div>{order.time.toString()}</div>
              <h2 className="text-lg font-bold">Tips</h2>
              <div>{order.tips}</div>
              <h2 className="text-lg font-bold">Delivery Time</h2>
              <div>{order.deliveryTime.toString()}</div>
              </div>
          ))}
        </div>
      </div>
      </main>
    );
  } catch (error) {
    console.error(error);
    // Handle error
  }
}