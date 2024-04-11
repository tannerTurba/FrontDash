import RestaurantTable from "../ui/dashboard/restaurants/restaurant-table";

export default async function Page() {
    return (
      <main>
        <div className="flex relative overflow-x-auto shadow-md sm:rounded-lg">
          <RestaurantTable />
        </div>
      </main>
    );
  }