import { getEmployees, updateUserStatus } from '@/scripts/user';

export default async function EmployeeRow() {
  // add getuserdata once fixed
  const businessId = '54';
  const users = await getEmployees(businessId);
  
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" >
      <tr>
        <th className="px-6 py-3">Username</th>
        <th className="px-6 py-3">ID</th>
        <th className="px-6 py-3">Status</th>
        <th className="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((employee) => (
        <tr key={employee.username} className="bg-gray-50 hover:bg-sky-100 dark:bg-gray-900 dark:hover:bg-sky-900">
          <td className="border px-4 py-2">{employee.username}</td>
          <td className="border px-4 py-2">{employee.id}</td>
          <td className={`border px-4 py-2 ${employee.status === "active" ? "text-green-500" : "text-red-500"}`}>
            {employee.status}
          </td>
          <td className="border px-4 py-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={async () => {
                "use server"
                updateUserStatus(employee.id, employee.status);
              }}>
                Change Status
              </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  
  );
}