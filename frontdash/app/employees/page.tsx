import Buttons from "./button-container";
import EmployeeTable from "./employeeTable";

export default async function Page() {
  return (
    <main>
      <Buttons />
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <div className="flex relative overflow-x-auto shadow-md sm:rounded-lg">
        <EmployeeTable />
      </div>
    </main>
  );
}