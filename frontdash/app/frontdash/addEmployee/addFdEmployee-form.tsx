'use client';

import {
    ExclamationCircleIcon,
    CheckCircleIcon
  } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { submitFdEmployee } from '@/app/lib/actions';
import Link from 'next/link';

  export default function AddFdEmployeeForm() {
    const [errorMessage, dispatch] = useFormState(submitFdEmployee, undefined);

    return (
    <form action={dispatch} className="space-y-3">
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 dark:border-gray-100/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Add Driver</h2>
                
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
                                placeholder='John'
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
                                placeholder='Doe'
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
                </div>
            </div>
        </div>

        <div className="flex h-8 items-end space-x-1" aria-live='polite' aria-atomic='true'>
            {errorMessage && (ErrorMessage(errorMessage))}
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link href="/drivers" type="button" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
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