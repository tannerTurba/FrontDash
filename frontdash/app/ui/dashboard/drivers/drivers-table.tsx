'use server';

import DriversRows from "./drivers-row";
import { getAllDrivers } from "@/scripts/user";

export default async function DriversTable() {
    let restaurantData = await getAllDrivers();

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3">
                    Driver name
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
                <DriversRows data={restaurantData} />
            </tbody>
        </table>
    );
}