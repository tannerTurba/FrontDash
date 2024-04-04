'use client';

import {
    KeyIcon,
    ExclamationCircleIcon,
    CheckCircleIcon
  } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { changePassword } from '@/app/lib/actions';
  
  export default function EditPasswordForm() {
    const [errorMessage, dispatch] = useFormState(changePassword, undefined);

    return (
      <form action={dispatch} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
        <h1 className={`$ mb-3 text-2xl text-gray-900 dark:text-gray-100`}>
            Update your password
          </h1>
          <div className="w-full">
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-gray-100"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 dark:border-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:text-gray-100 dark:bg-gray-950"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-gray-100"
                htmlFor="confirm-password"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 dark:border-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:text-gray-100 dark:bg-gray-950"
                  id="confirm-password"
                  type="password"
                  name="confirm-password"
                  placeholder="Re-enter password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
              </div>
            </div>
          </div>
          <div className="flex h-8 items-end space-x-1" aria-live='polite' aria-atomic='true'>
            {errorMessage && (ErrorMessage(errorMessage))}
          </div>
          <SubmitButton />
        </div>
      </form>
    );
  }
  
  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button className="mt-4 w-full" aria-disabled={pending}>
        Submit updated password <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50 dark:text-gray-900" />
      </Button>
    );
  }

  function ErrorMessage(message) {
    if (message === 'Password updated successfully.') {
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