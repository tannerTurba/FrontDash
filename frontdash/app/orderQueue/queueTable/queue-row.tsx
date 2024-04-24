'use client';

import { formatDate } from "@/scripts/order";
import { useState } from "react";

export default function QueueRows(args) {
    let orderData = args.data;
    let drivers = args.drivers;
    // let drivers = fetch(`http://localhost:3000/api/orders/${id}`, {
    //     method: 'POST',
    //     headers: { driverId: selectedDriver }
    // });

    return (
        <>
            {orderData.map((order) => {
                let id = `${order['id']}`;
                let time = order['time'];
                let price = order['price'];
                const [status, setStatus] = useState(order['status']);
                                                
                const [selectedDriver, setSelectedDriver] = useState(drivers[0]['id']);
                
                return (
                    <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {id}
                        </th>
                        <td className="px-6 py-4">
                            {`$${Math.trunc(price * 100) / 100}`}
                        </td>
                        <td className="px-6 py-4">
                            {formatDate(time)}
                        </td>
                        <td className="px-6 py-4">
                            {status}
                        </td>
                        <td className="px-6 py-4">
                            <select 
                                name="assignDriver" 
                                id={id} 
                                onChange={async (event) => {
                                    setSelectedDriver(event.target.value);
                                }}
                                value={selectedDriver}
                            >
                                {drivers.map((driver) => {
                                    let id = driver['id'];
                                    let fName = driver['fName'];
                                    let lName = driver['lName'];

                                    return (<option value={id}>{`${fName} ${lName}`}</option>)
                                })}
                            </select>
                            <button 
                                className="ml-2"
                                onClick={async (event) => {
                                    setStatus('waiting');
                                    await fetch(`http://localhost:3000/api/orders/${id}`, {
                                        method: 'POST',
                                        headers: { driverId: selectedDriver }
                                    });
                                }}
                            >
                                Assign
                            </button>
                        </td>
                    </tr>
                );
            })}
        </>
    );
}