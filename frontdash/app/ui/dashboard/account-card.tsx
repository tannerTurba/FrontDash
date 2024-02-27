'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default async function AccountCard(args) {
    const pathname = usePathname();
    const image = args.user.image;
    const name = args.user.username;
    let role = args.user.role;
    role = role[0].toUpperCase() + role.slice(1);

    return (
        <Link href={'/dashboard/account'}>
        <div className={clsx('flex items-center gap-x-6 hover:text-blue-600 dark:hover:text-blue-400', 
            { 'text-blue-600': pathname === '/dashboard/account' }
        )}>
          {getProfilePic(image, name)}
          <div>
            <h3 className="text-base font-semibold leading-7 tracking-tight">{name}</h3>
            <p className="text-sm font-semibold leading-6">{role}</p>
          </div>
        </div>
        </Link>
        );
}

function getProfilePic(image, name) {
    const pathname = usePathname();
    if (image != null || image != undefined) {
        return <img className={clsx("h-12 w-12 rounded-full ml-3", { 'border-2 border-blue-600 dark:border-blue-400': pathname === '/dashboard/account' })} src={image} alt="" />
    } 
    else {
        let letters = name.split(" ")[0].toUpperCase()[0];
        if (letters.split(" ").length >= 2) {
            letters += name.split(" ")[1].toUpperCase()[0];
        } 
        return (
            <div className={clsx("relative inline-flex items-center justify-center w-12 h-12 ml-3 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600",
                { 'border-2 border-blue-600 dark:border-blue-400': pathname === '/dashboard/account' }
            )}>
                <span className="font-medium text-gray-600 dark:text-gray-300">{letters}</span>
            </div>
        ) 
    }
}