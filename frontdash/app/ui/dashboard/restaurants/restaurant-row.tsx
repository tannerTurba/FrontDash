'use client';

import { useState } from "react";

export default function RestaurantRows(args) {
    let restaurantData = args.data;

    return (
        <>
            {restaurantData.map((restaurant) => {
                let businessId = restaurant['businessId'];
                let managerId = `${restaurant['userId']}`;
                let name = restaurant['name'];
                let manager = restaurant['manager'];
                const [status, setStatus] = useState(restaurant['status']);

                const activateRestaurant = async () => {
                    const res = await fetch(`http://localhost:3000/api/restaurants/${businessId}`, {
                        method: 'POST',
                        headers: { actionType: 'activate' }
                    });
                    const data = await res.json();
                    console.log(data);
                }
                
                const withdrawRestaurant = async () => {
                    const res = await fetch(`http://localhost:3000/api/restaurants/${businessId}`, {
                        method: 'POST',
                        headers: { actionType: 'withdraw' }
                    });
                    const data = await res.json();
                    console.log(data);
                }
                
                let activate = ( 
                    <button 
                        onClick={async (event) => {
                            await activateRestaurant();
                            setStatus("active");
                            setAction(deactivate);
                        }} 
                        className={status === 'pending' ? "font-medium text-lime-300 dark:text-lime-400 hover:underline" : "font-medium text-green-700 dark:text-green-600 hover:underline"}
                    >
                        Activate
                    </button> 
                );
                let deactivate = ( 
                    <button 
                        onClick={async (event) => {
                            await withdrawRestaurant();
                            setStatus('inactive');
                            setAction(activate);
                        }} 
                        className={status === 'pending' ? "font-medium text-orange-300 dark:text-orange-400 hover:underline" : "font-medium text-red-700 dark:text-red-600 hover:underline"}
                    >
                        Deactivate
                    </button> 
                );
                
                const getButton = (status) => {
                    if (status === 'active') {
                        return deactivate;
                    }
                    else if (status == 'inactive') {
                        return activate;
                    }
                    else {
                        return (<> {activate} {deactivate} </>);
                    }
                }
                
                const [actionButton, setAction] = useState(getButton(status));
                
                return (
                    <tr key={businessId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {name}
                        </th>
                        <td className="px-6 py-4">
                            {manager}
                        </td>
                        <td className="px-6 py-4">
                            {status}
                        </td>
                        <td className="px-6 py-4">
                            {actionButton}
                        </td>
                    </tr>
                );
            })}
        </>
    );
}