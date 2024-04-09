'use client';

import { useState } from "react";

export default function DriversRows(args) {
    let driverData = args.data;

    return (
        <>
            {driverData.map((driver) => {
                let id = `${driver['id']}`;
                let name = driver['name'];
                const [status, setStatus] = useState(driver['status']);

                const rehireDriver = async () => {
                    const res = await fetch(`http://localhost:3000/api/drivers/${id}`, {
                        method: 'POST',
                        headers: { actionType: 'activate' }
                    });
                    const data = await res.json();
                }
                
                const fireDriver = async () => {
                    const res = await fetch(`http://localhost:3000/api/drivers/${id}`, {
                        method: 'POST',
                        headers: { actionType: 'withdraw' }
                    });
                    const data = await res.json();
                }
                
                let activate = ( 
                    <button 
                        onClick={async (event) => {
                            await rehireDriver();
                            setStatus("active");
                            setAction(fire);
                        }} 
                        className="font-medium text-green-700 dark:text-green-600 hover:underline"
                    >
                        Activate
                    </button> 
                );
                let fire = ( 
                    <button 
                        onClick={async (event) => {
                            await fireDriver();
                            setStatus('inactive');
                            setAction(activate);
                        }} 
                        className="font-medium text-red-700 dark:text-red-600 hover:underline"
                    >
                        Fire
                    </button> 
                );
                
                const getButton = (status) => {
                    if (status === 'active') {
                        return fire;
                    }
                    else if (status == 'inactive') {
                        return activate;
                    }
                    else {
                        return (<> {activate} {fire} </>);
                    }
                }
                
                const [actionButton, setAction] = useState(getButton(status));
                
                return (
                    <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {name}
                        </th>
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