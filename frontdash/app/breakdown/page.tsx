'use client';

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const [tipAmount, setTipAmount] = useState('0');
    const [activeButton, setActiveButton] = useState(null);
    const currentDate = new Date().toLocaleString();

    const searchParams = useSearchParams();
    const restaurantName = searchParams.get('name');
    const encodedString = searchParams.get('order');
    const decodedString = decodeURIComponent(encodedString);
    const cartItems = decodedString ? JSON.parse(decodedString) : [];

    const rawTotal = cartItems.reduce((total, item) => {
        return total + (item.price * item.value);
    }, 0);

    const handleTipClick = (percent) => {
        setTipAmount(((percent / 100) * rawTotal).toFixed(2));
        setActiveButton(percent);
    }; 

    return (
        <div className="mt-8 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-2">Shopping Cart</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-3 text-center">{restaurantName}</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="relative flex justify-between items-center bg-gray-200 mb-3 p-2 rounded-lg hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-sky-900 dark:hover:text-blue-400">
                <div className="flex items-center">
                  <p className="text-black-700 dark:text-gray-300">{item.value} x</p>
                  <p className="ml-2 text-black-700 dark:text-gray-300">{item.item}</p>
                </div>
                <p className="ml-auto mr-5 text-black-700 dark:text-gray-300">{item.value} * ${item.price} = ${(item.price * item.value).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex">
                <button className={`flex-grow w-8 h-12 ${activeButton === 15 ? 'bg-gray-600' : 'bg-gray-400'} hover:bg-gray-600 text-white font-bold rounded flex items-center justify-center mr-2`}
                onClick={() => handleTipClick(15)}>15%</button>
                <button className={`flex-grow w-8 h-12 ${activeButton === 18 ? 'bg-gray-600' : 'bg-gray-400'} hover:bg-gray-600 text-white font-bold rounded flex items-center justify-center mr-2`}
                onClick={() => handleTipClick(18)}>18%</button>
                <button className={`flex-grow w-8 h-12 ${activeButton === 20 ? 'bg-gray-600' : 'bg-gray-400'} hover:bg-gray-600 text-white font-bold rounded flex items-center justify-center mr-2`}
                onClick={() => handleTipClick(20)}>20%</button>
                <button className={`flex-grow w-8 h-12 ${activeButton === 'Custom' ? 'bg-gray-600' : 'bg-gray-400'} hover:bg-gray-600 text-white font-bold rounded flex items-center justify-center`}
                onClick={() => handleTipClick(0)}>No Tip</button>
            </div>
            <div className="flex flex-col mt-5">
                <p className="text-right">Subtotal: ${rawTotal.toFixed(2)}</p>
                <p className="text-right">Service Charge: ${(rawTotal * .06).toFixed(2)}</p>
                <p className="text-right">Tip Amount: ${tipAmount}</p>
                <p className="text-right">Total: ${(parseFloat(tipAmount) + rawTotal + (rawTotal * .06)).toFixed(2)}</p>
            </div>
            <div className="flex justify-end mt-3">
              <p className="text-black-700">{currentDate}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Checkout</button>
          </div>
        </div>
    );
}