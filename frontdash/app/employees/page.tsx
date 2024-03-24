import { Button } from "../ui/button";
import { UserPlusIcon } from '@heroicons/react/24/outline';

export default async function Page() {
    return (
      <main>
        <div className="flex justify-end">
          <Button className="mt-4" href={`employees/addEmployee`}>
            <UserPlusIcon className="w-6" />
            <p className="hidden md:block pl-3">Add Employee</p>
          </Button>
        </div>
      </main>
    );
  }