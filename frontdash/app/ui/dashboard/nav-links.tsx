'use client';

import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  RectangleGroupIcon,
  ClockIcon,
  PencilSquareIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

let order = { name: 'Orders', href: '/orders', icon: DocumentDuplicateIcon };
let orderQueue = { name: 'Orders', href: '/orderQueue', icon: DocumentDuplicateIcon };
let management = { name: 'Management', href: '/employees', icon: UserGroupIcon };
let menu = { name: 'Menu', href: '/menu', icon: RectangleGroupIcon };
let restaurantHours = { name: 'Restaurant Hours', href: '/hours', icon: ClockIcon };
let register = { name: 'Register', href: '/registration', icon: PencilSquareIcon };
let restaurants = { name: 'Restaurants', href: '/restaurants', icon: BuildingStorefrontIcon };
let drivers = { name: 'Drivers', href: '/drivers', icon: TruckIcon };
let frontdash = { name: 'Frontdash', href: '/frontdash', icon: UserGroupIcon };
let orderStatus = { name: 'Status', href: '/status', icon: CheckCircleIcon };

function getLinks(userRole, status) {
  if (userRole == 'manager' && status == 'active') {
    return [order, management, menu, restaurantHours, orderStatus];
  }
  else if (userRole == 'manager' && status == 'pending') {
    return [];
  }
  else if (userRole == 'employee') {
    return [order, menu, restaurantHours, orderStatus];
  }
  else if (userRole == 'frontdash') {
    return [restaurants, drivers, orderQueue, orderStatus];
  }
  else if (userRole == 'driver') {
    return [];
  }
  else if (userRole == 'admin') {
    return [frontdash, restaurants, drivers, orderQueue, orderStatus];
  }
  return [register, orderStatus];
}

export default async function NavLinks(args) {
  const pathname = usePathname();
  let links = getLinks(args.userRole, args.status);

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