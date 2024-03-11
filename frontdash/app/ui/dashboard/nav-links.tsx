'use client';

import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  RectangleGroupIcon,
  ClockIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

let order = { name: 'Orders', href: '/orders', icon: DocumentDuplicateIcon };
let employees = { name: 'Employees', href: '/employees', icon: UserGroupIcon };
let menu = { name: 'Menu', href: '/menu', icon: RectangleGroupIcon };
let restaurantHours = { name: 'Restaurant Hours', href: '/hours', icon: ClockIcon };
let register = { name: 'Register', href: '/registration', icon: PencilSquareIcon };

function getLinks(userRole) {
  if (userRole == 'manager') {
    return [order, employees, menu, restaurantHours];
  }
  else if (userRole == 'employee') {
    return [order, menu, restaurantHours];
  }
  return [register];
}

export default async function NavLinks(args) {
  const pathname = usePathname();
  let links = getLinks(args.userRole);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-gray-900 dark:hover:bg-sky-900 dark:hover:text-blue-400',
              {
                'bg-sky-100 text-blue-600 dark:bg-sky-900 dark:text-blue-400': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}