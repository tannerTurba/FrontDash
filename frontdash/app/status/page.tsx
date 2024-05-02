'use client';

import { useState } from 'react';

export default function Page() {
  const [orderNumber, setOrderNumber] = useState('');
  const [warning, setWarning] = useState(null);
  const [status, updateStatus] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number.isInteger(parseInt(value)) && parseInt(value) > 0)) {
      setOrderNumber(value);
    }
  };

  const checkStatus = async () => {
    if (!orderNumber) {
        setWarning("OrderId field is empty.");
        return;
    }

    const res = await fetch(`http://localhost:3000/api/orders/${orderNumber}`, {
        method: 'GET',
        headers: { id: orderNumber}
    });
    const orderStatus = await res.json();
console.log(orderStatus);
    updateStatus('Your order is: ' + orderStatus.status);
  };

  return (
    <div className="mt-8 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-2">Check Order Status</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-l">Order Number</h2>
        <input 
          type="number"
          className="w-full px-3 py-2 mb-3 border rounded-md"
          value={orderNumber}
          onChange={handleChange}
          min="1"
          placeholder="100"
        />
        {warning && <p className="text-red-600 text-sm">{warning}</p>}
      </div>
        <div className="flex items-end space-x-1" aria-live='polite' aria-atomic='true'>
            {status}
        </div>
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={checkStatus}>
          Check
        </button>
      </div>
    </div>
  );
}