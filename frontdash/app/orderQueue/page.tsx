import QueueTable from "./queueTable/queue-table";

export default async function Page() {
    return (
        <main>
          <div className="flex relative overflow-x-auto shadow-md sm:rounded-lg my-2">
            <QueueTable />
          </div>
        </main>
    );
}