'use server'

import { getFrontdashEmployees } from "@/scripts/frontdash";
import FdRows from "./fdRow";

export default async function FdTable() {
    const users = await getFrontdashEmployees();
    console.log(users);

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Username
                    </th>
                    <th scope="col" className="px-6 py-3">
                        ID
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
                <FdRows data={users} />
            </tbody>
        </table>
    );
}