import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import QueueTable from "./queueTable/queue-table";

export default async function Page() {
    return (
        <main>
          {/* <div className="flex justify-end my-2 mx-4">
            <Button className="mt-4 mx-1" href={`drivers/addDriver`}>
              <UserPlusIcon className="w-6" />
              <p className="hidden md:block pl-3">Add Driver</p>
            </Button>
          </div> */}
          <div className="flex relative overflow-x-auto shadow-md sm:rounded-lg my-2">
            <QueueTable />
          </div>
        </main>
    );
}