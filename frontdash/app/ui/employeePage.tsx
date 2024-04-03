'use client'
import React, { useState } from 'react';
import { getAllUsers, updateUserStatus } from '@/scripts/employee';
import { getUserData } from '@/auth';


export default async function page() {
  
  try {
    // add getuserdata once fixed
    const businessId = '54';
    const users = await getAllUsers(businessId);

    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <div className="flex flex-wrap gap-4">
          {users.map((employee) => (
            <div key={employee.username} className="grow rounded-lg bg-gray-50 p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-gray-900 gap-4 dark:hover:bg-sky-900 dark:hover:text-blue-400">
              <h2 className="text-lg font-bold">Username</h2>
              <div>{employee.username}</div>
              <h2 className="text-lg font-bold">ID</h2>
              <div>{employee.id}</div>
              <h2 className="text-lg font-bold">Status</h2>
              <div className={employee.status === "active" ? "text-green-500" : "text-red-500"}>
                {employee.status}
              </div>
              <div className="mt-4">
                <button onClick={() => updateUserStatus(employee.id, employee.status)} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Change Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  catch (error) {
    console.error('Error fetching Users:', error);
  }
}