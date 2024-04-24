'use server';

import { getOpenOrders } from "@/scripts/order";
import QueueRows from "./queue-row";
import { getAllActiveDrivers } from "@/scripts/user";

export default async function QueueTable() {
    let orderData = await getOpenOrders();
    let drivers = await getAllActiveDrivers();

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Creation Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Assign Driver
                    </th>
                </tr>
            </thead>
            <tbody>
                <QueueRows data={orderData} drivers={drivers} />
            </tbody>
        </table>
    );
}