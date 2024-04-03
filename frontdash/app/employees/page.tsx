import EmployeePage from "@/app/ui/employeePage"
import Buttons from "./button-container";

export default async function Page() {
  return (
    <main>
      <Buttons />
      <EmployeePage /> 
    </main>
  );
}