'use client';

import Link from 'next/link';

export default async function AccountCard(args) {
    const image = args.user.image;
    const name = args.user.username;
    let role = args.user.role;
    role = role[0].toUpperCase() + role.slice(1);

    return (
        <Link href={'/dashboard/account'}>
        <div className="flex items-center gap-x-6">
          {getProfilePic(image, name)}
          <div>
            <h3 className="text-base font-semibold leading-7 tracking-tight">{name}</h3>
            <p className="text-sm font-semibold leading-6 text-blue-600">{role}</p>
          </div>
        </div>
        </Link>
        );
}

function getProfilePic(image, name) {
    if (image != null || image != undefined) {
        return <img className="h-12 w-12 rounded-full ml-3" src={image} alt="" />
    } 
    else {
        let letters = name.split(" ")[0].toUpperCase()[0];
        if (letters.split(" ").length >= 2) {
            letters += name.split(" ")[1].toUpperCase()[0];
        } 
        return (
            <div className="relative inline-flex items-center justify-center w-12 h-12 ml-3 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{letters}</span>
            </div>
        ) 
    }
}