import { cookies } from "next/headers";
import { getFoodItemsByBusiness, getBusinessId } from "@/scripts/business";
import Link from "next/link";

export default async function Page() {
  try {
    let username = cookies().get('username').value;
    let restaurantId = await getBusinessId(username);
    const resId = restaurantId['id'];
    let menuItems = await getFoodItemsByBusiness(restaurantId.id);

    return (
      <div className="mt-8">
        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-2">Menu</h2>
          <Link href={`/food/addFood?id=${resId}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex rounded mb-3 items-center justify-center w-auto h-12 px-4 text-sm">
              Add Food Item
            </button>
          </Link>
        </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            {menuItems.map((item, index) => (
              <ModifiableMenuItem key={index} item={item} />
            ))}
          </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <main>
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-red-600">Error fetching data. Please try again later.</p>
          </div>
        </div>
      </main>
    );
  }
}

function ModifiableMenuItem({ item }) {
    return (
      <div className="relative flex justify-between items-center bg-gray-200 mb-2 p-2 rounded-lg hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-sky-900 dark:hover:text-blue-400">
        <div>
          <p className="text-gray-700 dark:text-gray-300">{item.name}</p>
          <p className="text-gray-700 dark:text-gray-300">${item.price.toFixed(2)}</p>
          <p className="text-gray-700 dark:text-gray-300">Available: {item.stock}</p>
        </div>
        <div className="flex items-center justify-end">
          <Link href={`/food?id=${item.id}&name=${item.name}&price=${item.price}&stock=${item.stock}`}>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold flex rounded mr-5 items-center justify-center w-auto h-12 px-4 text-sm">
              Modify Item
            </button>
          </Link>
        </div>
      </div>
    );
  }