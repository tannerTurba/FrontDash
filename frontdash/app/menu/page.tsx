export default async function Page() {
    // Dummy menu items
  const menuItems = [
    'Appetizer 1',
    'Appetizer 2',
    'Appetizer 3',
    'Main Course 1',
    'Main Course 2',
    'Main Course 3',
    'Dessert 1',
    'Dessert 2',
    'Dessert 3'
  ];

  return (
    <main>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Restaurant Name</h1>
            <p className="text-gray-600">Description of the restaurant</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">Hours</h2>
              <p className="text-gray-700">Monday - Friday: 10:00 AM - 9:00 PM</p>
              <p className="text-gray-700">Saturday - Sunday: 11:00 AM - 10:00 PM</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
              <p className="text-gray-700">123 Main St, City, State, Zip</p>
              <p className="text-gray-700">Phone: (123) 456-7890</p>
              <p className="text-gray-700">Email: info@example.com</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Menu</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              {menuItems.map((item, index) => (
                <div key={index} className="mb-2 p-2 rounded-lg hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-sky-900 dark:hover:text-blue-400">
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  }