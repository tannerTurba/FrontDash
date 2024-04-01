'use client';

import {
    ExclamationCircleIcon,
    CheckCircleIcon,
    ArrowRightIcon
  } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { submitEmployee } from '@/app/lib/actions';
import HoursRow from './hours-form-row';

export default function EditHoursForm(args) {
    const [errorMessage, dispatch] = useFormState(submitEmployee, undefined);
    let username = args.username;

    return (
        <form action={dispatch} className="space-y-3">
            <div className="space-y-12">
                <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Update Opening Hours</h2>
                
                    <HoursRow day="Sunday" />
                    <HoursRow day="Monday" />
                    <HoursRow day="Tuesday" />
                    <HoursRow day="Wednesday" />
                    <HoursRow day="Thursday" />
                    <HoursRow day="Friday" />
                    <HoursRow day="Saturday" />

                    <div className="flex h-8 items-end space-x-1" aria-live='polite' aria-atomic='true'>
                        {errorMessage && (ErrorMessage(errorMessage))}
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <SubmitButton />
                    </div>
                </div>
            </div>

        <input
            type="text"
            name="manager"
            required
            className='hidden'
            value={username}
        />

        </form>
    );
}
  
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Submit Updated Business Hours 
            <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50 dark:text-gray-900" />
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
