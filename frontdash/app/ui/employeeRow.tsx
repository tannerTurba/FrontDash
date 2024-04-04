import { getEmployees, updateUserStatus } from '@/scripts/user';

export default async function EmployeeRow() {
  // add getuserdata once fixed
  const businessId = '54';
  const users = await getEmployees(businessId);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users.map((employee) => (
        <div key={employee.username} className="grow rounded-lg bg-gray-50 p-3 hover:bg-sky-100 md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-gray-900 dark:hover:bg-sky-900">
          <div className="grid justify-items-center text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
            <h2 className="text-lg font-bold">Username</h2>
            <div>{employee.username}</div>
            <h2 className="text-lg font-bold">ID</h2>
            <div>{employee.id}</div>
            <h2 className="text-lg font-bold">Status</h2>
            <div className={employee.status === "active" ? "text-green-500" : "text-red-500"}>
              {employee.status}
            </div>
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={async () => {
                "use server"
                updateUserStatus(employee.id, employee.status);
              }}>
                Change Status
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}