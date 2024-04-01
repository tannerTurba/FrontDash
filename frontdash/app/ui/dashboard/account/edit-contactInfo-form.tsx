'use client';

import {
    ExclamationCircleIcon,
    CheckCircleIcon
  } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { changeContactInfo } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ContactInfo } from '@prisma/client';

  export default function ContactInfoForm(args) {
    const [errorMessage, dispatch] = useFormState(changeContactInfo, undefined);
    let info: ContactInfo = args.info;

    return (
    <form action={dispatch} className="space-y-3">
        <div className="space-y-12">
            <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
                <h1 className={`$ mb-3 text-2xl text-gray-900 dark:text-gray-100`}>
                    Update your contact information
                </h1>

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
                                defaultValue={info.firstName !== null ? info.firstName : ""}
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
                                defaultValue={info.lastName !== null ? info.lastName : ""}
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
                            defaultValue={info.email !== null ? info.email : ""}
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
                            defaultValue={info.phoneNumber !== null ? `${info.phoneNumber}` : ""}
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
                            defaultValue={info.buildingNumber !== null ? info.buildingNumber : ""}
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
                            defaultValue={info.unitNumber !== null ? info.unitNumber : ""}
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
                            defaultValue={info.street !== null ? info.street : ""}
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
                            defaultValue={info.city !== null ? info.city : ""}
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
                            defaultValue={info.state !== null ? info.state : ""}
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
                            defaultValue={info.zipCode !== null ? info.zipCode : ""}
                            autoComplete="postal-code"
                            className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex h-8 items-end space-x-1" aria-live='polite' aria-atomic='true'>
                    {errorMessage && (ErrorMessage(errorMessage))}
                </div>
                <SubmitButton />
            </div>
        </div>
    </form>
    );

  }
  
  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Submit updated contact information <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50 dark:text-gray-900" />
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