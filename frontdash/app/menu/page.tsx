import { getFoodItemsByBusiness, getAvailabilityByBusiness, getContactInfoByBusiness, getRestaurantById } from '@/scripts/business';


export default async function Page() {

const restaurantId = '54';
  try {
    const [menuItems, restaurant, availability, contactInfo] = await Promise.all([
      getFoodItemsByBusiness(restaurantId),
      getRestaurantById(parseInt(restaurantId, 10)),
      getAvailabilityByBusiness(parseInt(restaurantId, 10)),
      getContactInfoByBusiness(parseInt(restaurantId, 10))
    ]);
    const contact = contactInfo[0];
    const hours = availability[0];

    return (
      <main>
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">{restaurant?.name}</h1>
              <p className="text-gray-600">{restaurant?.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">Hours</h2>
              <p className="text-gray-700">Monday: {hours?.monOpen.toLocaleString([], {hour: '2-digit', minute:'2-digit'})} - {hours?.monClose.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p className="text-gray-700">Tuesday: {hours?.tuesOpen.toLocaleString([], {hour: '2-digit', minute:'2-digit'})} - {hours?.tuesClose.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p className="text-gray-700">Wednesday: {hours?.wedOpen.toLocaleString([], {hour: '2-digit', minute:'2-digit'})} - {hours?.wedClose.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p className="text-gray-700">Thursday: {hours?.thurOpen.toLocaleString([], {hour: '2-digit', minute:'2-digit'})} - {hours?.thurClose.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p className="text-gray-700">Friday: {hours?.friOpen.toLocaleString([], {hour: '2-digit', minute:'2-digit'})} - {hours?.friClose.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p className="text-gray-700">Saturday: {hours?.satOpen.toLocaleString([], {hour: '2-digit', minute:'2-digit'})} - {hours?.satClose.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p className="text-gray-700">Sunday: {hours?.sunOpen.toLocaleString([], {hour: '2-digit', minute:'2-digit'})} - {hours?.sunClose.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                <p className="text-gray-700">Name: {contact?.firstName} {contact?.lastName}</p>
                <p className="text-gray-700">Address: {contact?.buildingNumber} {contact?.street} {contact?.unitNumber}, {contact?.city}, {contact?.state} {contact?.zipCode}</p>
                <p className="text-gray-700">Phone Number: {contact?.phoneNumber}</p>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Menu</h2>
              <div className="bg-white rounded-lg shadow-md p-4">
                {menuItems.map((item, index) => (
                  <div key={index} className="bg-gray-200 mb-2 p-2 rounded-lg hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-sky-900 dark:hover:text-blue-400">
                    <p className="text-gray-700 dark:text-gray-300">{item.name}</p>
                    <p className="text-gray-700 dark:text-gray-300">${item.price.toFixed(2)}</p>
                    <p className="text-gray-700 dark:text-gray-300">Available: {item.stock}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
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