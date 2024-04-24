'use client'

import { User } from "@prisma/client";
import { useState } from "react";

export default function FdRows(args) {
    let users = args.data as User[];
    console.log(`users: ${users}`);

    return (
        <>
            {users.map((user) => {
                let username = user['username'];
                let id = `${user['id']}`;
                const [status, setStatus] = useState(user['status']);

                const activateUser = async () => {
                    const res = await fetch(`http://localhost:3000/api/frontdash/${id}`, {
                        method: 'POST',
                        headers: { actionType: 'activate' }
                    });
                }
                
                const deactivateEmployee = async () => {
                    const res = await fetch(`http://localhost:3000/api/frontdash/${id}`, {
                        method: 'POST',
                        headers: { actionType: 'withdraw' }
                    });
                }
                
                let activate = ( 
                    <button 
                        onClick={async (event) => {
                            await activateUser();
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
                            await deactivateEmployee();
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
                    <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {username}
                        </th>
                        <td className="px-6 py-4">
                            {id}
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