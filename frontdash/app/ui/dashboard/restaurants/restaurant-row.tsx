'use client';

import { useState } from "react";

// function ActionButton(name: string, status: string) {
//     const activateRestaurant = async () => {
//         const res = await fetch(`http://localhost:3000/api/restaurants/${name}`, {
//             headers: { actionType: 'activate' }
//         });
//         const data = await res.json();
//         console.log(data);
//     }

//     const withdrawRestaurant = async () => {
//         const res = await fetch(`http://localhost:3000/api/restaurants/${name}`, {
//             headers: { actionType: 'withdraw' }
//         });
//         const data = await res.json();
//         console.log(data);
//     }

//     let activate = ( <button onClick={activateRestaurant} className="font-medium text-green-700 dark:text-green-600 hover:underline">Activate</button> );
//     let deactivate = ( <button onClick={withdrawRestaurant} className="font-medium text-red-700 dark:text-red-600 hover:underline">Deactivate</button> );

//     if (status === 'active') {
//         return deactivate;
//     }
//     else {
//         return activate;
//     }
// }

export default function RestaurantRows(args) {
    let restaurantData = args.data;
    // let apiResponse = fetch('http://localhost:3000/api/restaurants/TANNER').then(res => res.json()).then(res => console.log(res));

    return (
        <>
            {restaurantData.map((restaurant) => {
                let businessId = restaurant['businessId'];
                let managerId = `${restaurant['userId']}`;
                let name = restaurant['name'];
                let manager = restaurant['manager'];
                let status = restaurant['status'];

                const activateRestaurant = async () => {
                    const res = await fetch(`http://localhost:3000/api/restaurants/${managerId}`, {
                        method: 'POST',
                        headers: { actionType: 'activate' }
                    });
                    const data = await res.json();
                    console.log(data);
                }
                
                const withdrawRestaurant = async () => {
                    const res = await fetch(`http://localhost:3000/api/restaurants/${managerId}`, {
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
                            setAction(deactivate);
                        }} 
                        className="font-medium text-green-700 dark:text-green-600 hover:underline"
                    >
                        Activate
                    </button> 
                );
                let deactivate = ( 
                    <button 
                        onClick={async (event) => {
                            await withdrawRestaurant();
                            setAction(activate);
                        }} 
                        className="font-medium text-red-700 dark:text-red-600 hover:underline"
                    >
                        Deactivate
                    </button> );
                
                const getButton = (status) => {
                    if (status === 'active') {
                        return deactivate;
                    }
                    else {
                        return activate;
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