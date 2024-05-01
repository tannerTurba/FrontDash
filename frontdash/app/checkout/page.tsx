'use client';
import  OrderDetailsForm from '@/app/ui/paymentScreen'
export default async function Page() {

    return (
        <main>
            <div className="flex justify-end my-2 mx-4">
                <OrderDetailsForm/>
            </div>
        </main>
        );

}