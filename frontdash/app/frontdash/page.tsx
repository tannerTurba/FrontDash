import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import FdTable from "./fdTable";

export default async function Page() {
    return (
        <main>
            <div className="flex justify-end">
                <Button className="mt-4 mx-1" href={`frontdash/addEmployee`}>
                    <UserPlusIcon className="w-6" />
                    <p className="hidden md:block pl-3">Add Employee</p>
                </Button>
            </div>
            <h1 className="text-2xl font-bold mb-4">FrontDash Employees</h1>
            <div className="flex relative overflow-x-auto shadow-md sm:rounded-lg">
                <FdTable />
            </div>
        </main>
      );
}