import Buttons from "./button-container";
import EmployeeRow from "@/app/ui/employeeRow";

export default async function Page() {
  return (
    <main>
      <Buttons />
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <EmployeeRow />
    </main>
  );
}