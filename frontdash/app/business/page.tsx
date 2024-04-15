'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { useState, useRef } from 'react';
import Link from 'next/link';

export default async function Page() {
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get('id');

  try {
    const res = await fetch(`http://localhost:3000/api/restaurants/${restaurantId}`, {
      method: 'GET',
      headers: { id: restaurantId }
    });
    const restaurantInfo = await res.json();
    
    const contact = restaurantInfo.contactInfo[0];
    const hours = restaurantInfo.availability[0];

    let cart = [];
    const updateCart = (item, newValue) => {
      const index = cart.findIndex(cartItem => cartItem.id === item.id);
      console.log(index);
      if (index !== -1) {
        if (newValue === 0) {
          cart.splice(index, 1);
        } else {
          cart[index].value = newValue;
        }
      } else {
        if (newValue !== 0) {
          cart.push({ item: item.name, id: item.id, value: newValue, price: item.price.toFixed(2) });
        }
      }
      console.log(cart);
    };

    const handleClick = () => {
      if (cart.length === 0) {
        alert("Cart is empty!");
      } else {
        window.location.href = `/breakdown?order=${encodeURIComponent(JSON.stringify(cart))}`;
      }
    }

    return (
      <main>
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">{restaurantInfo.restaurant?.name}</h1>
              <p className="text-gray-600">{restaurantInfo.restaurant?.description}</p>
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
                {restaurantInfo.menuItems.map((item, index) => (
                    <MenuItem key={index} item={item} editCart={updateCart}/>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={handleClick}>
              <ShoppingCartIcon className="h-6 w-6 mr-2" />
              Shopping Cart
            </button>
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

function MenuItem({ item, editCart }) {
  const [quantity, updateQuantity] = useState(0);
  const inputRef = useRef(null);
  const [warning, setWarning] = useState(null);

  const incrementQuantity = () => {
    if (quantity < item.stock) {
      editCart(item, quantity + 1);
      updateQuantity(quantity + 1);
      setWarning("");
    } else {
      setWarning("Quantity cannot exceed available stock");
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      editCart(item, quantity - 1);
      updateQuantity(quantity - 1);
      setWarning("");
    } else {
      setWarning("Quantity has to be positive");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number.isInteger(parseInt(value)) && parseInt(value) >= 0)) {
      const newValue = value === "" ? 0 : parseInt(value);
      if (newValue <= item.stock) {
        editCart(item, newValue);
        updateQuantity(newValue);
        setWarning("");
        inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
      } else {
        editCart(item, item.stock);
        updateQuantity(item.stock);
        setWarning("Quantity cannot exceed available stock");
      }
    }
  };

  return (
    <div className="relative flex justify-between items-center bg-gray-200 mb-2 p-2 rounded-lg hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-sky-900 dark:hover:text-blue-400">
      <div>
        <p className="text-gray-700 dark:text-gray-300">{item.name}</p>
        <p className="text-gray-700 dark:text-gray-300">${item.price.toFixed(2)}</p>
        <p className="text-gray-700 dark:text-gray-300">Available: {item.stock}</p>
      </div>
      <div className="flex items-center justify-end">
        <button className="flex-shrink-0 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full flex items-center justify-center w-8 h-8 text-lg mr-2"
        onClick={decrementQuantity}>
          -
        </button>
        <input
          className="text-lg mr-2 w-8 text-center"
          type="text"
          value={quantity}
          onChange={handleChange}
          ref={inputRef}
        />
        <button className="flex-shrink-0 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full flex items-center justify-center w-8 h-8 text-lg mr-5"
        onClick={incrementQuantity}>
          +
        </button>
      </div>
      {warning && <p className="absolute bottom-0 right-0 text-red-600 text-s">{warning}</p>}
    </div>
  );
}