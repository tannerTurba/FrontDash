'use client';

import {
    ExclamationCircleIcon,
    CheckCircleIcon
  } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { submitRestaurant } from '@/app/lib/actions';
import Link from 'next/link';

  export default function RegistrationForm() {
    const [errorMessage, dispatch] = useFormState(submitRestaurant, undefined);

    return (
    <form action={dispatch} className="space-y-3">
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 dark:border-gray-100/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Restaurant Profile</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-600">
                    This information will be displayed to the customer.
                </p>

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
                                placeholder="McDonalds"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            About
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="about"
                                name="about"
                                rows={3}
                                required
                                className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                                placeholder='Greasy food and golden arches.'
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-600">Write a few sentences about your restaurant.</p>
                    </div>
{/* 
                    <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            Cover photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white dark:bg-gray-900">
                            <div className="text-center">
                                <img id='display' src=""/>
                                <div className="justify-center mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white dark:bg-gray-900 font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 dark:focus-within:ring-blue-400 focus-within:ring-offset-2 hover:text-blue-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={displayImage} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600 dark:text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="border-b border-gray-900/10 dark:border-gray-100/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Contact Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-600">
                    This should be the person responsible for handeling customer questions. The address is where orders will be picked up for delivery.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="first-name"
                                id="firstName"
                                autoComplete="given-name"
                                required
                                placeholder='Ronald'
                                className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="last-name"
                                id="lastName"
                                autoComplete="family-name"
                                required
                                placeholder='McDonald'
                                className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder='superSized@gmail.com'
                            className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            Phone Number
                        </label>
                        <div className="mt-2">
                            <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="phone"
                            placeholder='xxxxxxxxxx'
                            required
                            className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="buildingNumber" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            Building Number
                        </label>
                        <div className="mt-2">
                            <input
                            id="buildingNumber"
                            name="buildingNumber"
                            type="text"
                            autoComplete="building-number"
                            className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="unitNumber" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            Unit Number
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            id="unitNumber"
                            name="unitNumber"
                            autoComplete="unit-number"
                            className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            Street address
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="street-address"
                            id="streetAddress"
                            autoComplete="street-address"
                            placeholder='110 N Carpenter St'
                            required
                            className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            City
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="city"
                            id="city"
                            required
                            placeholder='Chicago'
                            autoComplete="address-level2"
                            className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            State / Province
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="state"
                            id="state"
                            placeholder='IL'
                            required
                            autoComplete="address-level1"
                            className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                            ZIP / Postal code
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            required
                            placeholder='60607'
                            autoComplete="postal-code"
                            className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex h-8 items-end space-x-1" aria-live='polite' aria-atomic='true'>
            {errorMessage && (ErrorMessage(errorMessage))}
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link href="/" type="button" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                Cancel
            </Link>
            <SubmitButton />
        </div>
    </form>
    );
  }
  
  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" aria-disabled={pending}>
        Submit
      </Button>
    );
  }

  function ErrorMessage(message) {
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


function displayImage() {
    let fileUpload = document.getElementById('file-upload') as HTMLInputElement;
    let file = fileUpload.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = function() {
            let dataURL = reader.result as string;
            (document.getElementById('display') as HTMLImageElement).src = dataURL;
        }
    }
}