import { Button } from "../ui/button";
import { UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { cookies } from "next/headers";
import { signOut } from "@/auth";
import { withdraw } from "@/scripts/business";

export default function Buttons() {
    return (
        <div className="flex justify-end">
            <Button className="mt-4 mx-1" href={`employees/addEmployee`}>
                <UserPlusIcon className="w-6" />
                <p className="hidden md:block pl-3">Add Employee</p>
            </Button>
            <form action={async () => {
                'use server';
                let username = cookies().get('username').value;
                await withdraw(username);

                if (cookies().has('username')) {
                    cookies().delete('username');
                }
                await signOut();
            }}
            >
                <Button className="mt-4 mx-1">
                    <XMarkIcon className="w-6" />
                    <p className="hidden md:block pl-3">Withdraw Restaurant</p>
                </Button>
            </form>
        </div>
    );
}