'use server'

import EmployeeRows from "./employeeRow";
import { cookies } from "next/headers";
import { getBusinessId } from "@/scripts/business";
import { getEmployees } from "@/scripts/user";

export default async function EmployeeTable() {
    let username = cookies().get('username').value;
    const businessId = await getBusinessId(username);
    const users = await getEmployees(businessId.id);

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
                <EmployeeRows data={users} manager={username} />
            </tbody>
        </table>
    );
}