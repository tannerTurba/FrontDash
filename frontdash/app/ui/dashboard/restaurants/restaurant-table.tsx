'use server';

import { getAllRestaurants } from "@/scripts/business";
import RestaurantRows from "./restaurant-row";

export default async function RestaurantTable() {
    let restaurantData = await getAllRestaurants();

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3">
                    Restaurant name
                </th>
                <th scope="col" className="px-6 py-3">
                    Manager
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                </tr>
            </thead>
            <tbody>
                <RestaurantRows data={restaurantData} />
            </tbody>
        </table>
    );
}