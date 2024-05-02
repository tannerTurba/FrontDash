'use client';

import { useState } from "react";

import {
    ExclamationCircleIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useSearchParams } from "next/navigation";

export default function Page() {
    const [errorStatus, updateError] = useState(null);

    const searchParams = useSearchParams();
    const restaurantId = searchParams.get('id');

    try {
        const createFood = async () => {
            const documentName = document.getElementById('name') as HTMLInputElement;
            const name = documentName ? documentName.value : '';
            const documentPrice = document.getElementById('price') as HTMLInputElement;
            const price = documentPrice ? documentPrice.value : '';
            const documentStock = document.getElementById('stock') as HTMLInputElement;
            const stock = documentStock ? documentStock.value : '';

            if (!documentName.value || !documentPrice.value || !documentStock.value) {
                updateError('All fields must be filled');
                return;
            }

            const res = await fetch(`http://localhost:3000/api/newFoodId`, {
            method: 'POST',
            headers: { name: name, price: price, stock: stock, resId: restaurantId }
            });
            const foodStatus = await res.json();

            updateError(foodStatus);
        }

        return (
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 dark:border-gray-100/10 pb-12">
                 <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Create Menu Item</h2>
                    <form>
                        <Name foodName={'Chicken Nuggets'}/>
                        <Price foodPrice={'10.00'}/>
                        <Stock foodStock={'50'}/>
                    </form>
                </div>
                <div className="flex items-end space-x-1" aria-live='polite' aria-atomic='true'>
                    {errorStatus && <ErrorMessage message={errorStatus}/>}
                </div>
                <div className="flex justify-end mr-5">
                    <div className="flex items-center justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex rounded mr-5 items-center justify-center w-auto h-10 px-4 text-sm"
                        onClick={createFood}>
                            Submit Food Item
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    catch (error) {
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

function ErrorMessage({message}) {
    if (message.includes('Success')) {
        return (
            <>
                <CheckCircleIcon className='h-5 w-5 text-green-500' />
                <p className='text-sm text-green-500'>{message}</p>
            </>
        );
    }
    else {
        return (
            <>
                <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
                <p className='text-sm text-red-500'>{message}</p>
            </>
        );
    }
}

function Name( {foodName} ) {
    const [name, setName] = useState('');

    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Name
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 dark:focus-within:ring-blue-400 sm:max-w-md">
                        <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        required
                        className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                        value={name}
                        placeholder={foodName}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Price( {foodPrice} ) {
    const [price, setPrice] = useState('');
    const [warning, setWarning] = useState(null);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const regex = /^\d+(\.\d{0,2})?$/;
    
        if (inputValue === '' || regex.test(inputValue)) {
            setPrice(inputValue);
            setWarning("");
        } else {
            setPrice('');
            setWarning("Quantity can only be positive numbers with up to two decimal places");
        }
    }

    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Price
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 dark:focus-within:ring-blue-400 sm:max-w-md">
                        <input
                        type="text"
                        name="price"
                        id="price"
                        autoComplete="price"
                        required
                        className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                        value={price}
                        placeholder={foodPrice}
                        onChange={handleChange}
                        />
                    </div>
                    {warning && <p className="text-red-600 text-sm">{warning}</p>}
                </div>
            </div>
        </div>
    );
}

function Stock( {foodStock} ) {
    const [stock, setStock] = useState('');
    const [warning, setWarning] = useState(null);

    const handleChange = (e) => {
        const inputValue = e.target.value.trim();
        const regex = /^\d*$/;

        if (inputValue === '' || regex.test(inputValue)) {
            setStock(inputValue);
            setWarning('');
        } else {
            setStock('');
            setWarning("Quantity can only be positive integers");
        }
    };

    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Stock
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 dark:focus-within:ring-blue-400 sm:max-w-md">
                        <input
                        type="text"
                        name="stock"
                        id="stock"
                        autoComplete="stock"
                        required
                        className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                        value={stock}
                        placeholder={foodStock}
                        onChange={handleChange}
                        />
                    </div>
                    {warning && <p className="text-red-600 text-sm">{warning}</p>}
                </div>
            </div>
        </div>
    );
}