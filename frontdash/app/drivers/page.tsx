import DriversTable from "../ui/dashboard/drivers/drivers-table";

export default async function Page() {
    return (
      <main>
        <div className="flex relative overflow-x-auto shadow-md sm:rounded-lg">
          <DriversTable />
        </div>
      </main>
    );
  }