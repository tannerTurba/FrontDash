'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  RectangleGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default async function NavLinks(args) {
  const pathname = usePathname();
  let userRole = args.userRole;

  let links = [];
  if (userRole == 'manager') {
    links = [
      { name: 'Home', href: '/dashboard', icon: HomeIcon },
      {
        name: 'Orders',
        href: '/dashboard/orders',
        icon: DocumentDuplicateIcon,
      },
      { name: 'Employees', href: '/dashboard/employees', icon: UserGroupIcon },
      { name: 'Menu', href: '/dashboard/menu', icon: RectangleGroupIcon },
      { name: 'Restaurant Hours', href: '/dashboard/hours', icon: ClockIcon }
    ];
  }
  else if (userRole == 'employee') {
    links = [
      { name: 'Home', href: '/dashboard', icon: HomeIcon },
      {
        name: 'Orders',
        href: '/dashboard/orders',
        icon: DocumentDuplicateIcon,
      },
      { name: 'Menu', href: '/dashboard/menu', icon: RectangleGroupIcon },
      { name: 'Restaurant Hours', href: '/dashboard/hours', icon: ClockIcon }
    ];
  }
  else {
    links = [
      { name: 'Home', href: '/dashboard', icon: HomeIcon },
      {
        name: 'Orders',
        href: '/dashboard/orders',
        icon: DocumentDuplicateIcon,
      }
    ];
  }

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