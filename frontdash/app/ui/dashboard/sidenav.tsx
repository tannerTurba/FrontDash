import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut, getUserData, getUserRole } from '@/auth';
import { cookies } from 'next/headers';
import AccountCard from './account-card';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import FrontDashLogo from '@/app/ui/FrontashLogo';

export default async function SideNav() {
  const userData = await getUserData();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Link href="/" className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-blue-500 p-3 text-sm font-medium hover:bg-blue-400 hover:text-sky-100 md:flex-none md:justify-start md:p-2 md:px-3 text-sky-50">
          <FrontDashLogo />
        </Link>
        {<NavLinks userRole={userData === 'unauthorized' ? 'unauthorized' : userData.role} />}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block dark:bg-gray-900"></div>
        {userData !== 'unauthorized'? <AccountCard user={userData} /> : <></>}
        <form
          action={async () => {
            'use server';
            if (cookies().has('username')) {
              cookies().delete('username');
            }
            await signOut();
          }}
        >
          {userData === 'unauthorized'? <SignInButton/> : <SignOutButton/>}
        </form>
      </div>
    </div>
  );
}

function SignInButton() {
  return (
    <Link href="/login" className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-gray-950 dark:hover:bg-sky-900 dark:hover:text-blue-400">
      <div className="hidden md:block">Sign In</div>
      <ArrowRightIcon className="w-5 md:w-6" />
    </Link>
  );
}

function SignOutButton() {
  return (
    <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-gray-950 dark:hover:bg-sky-900 dark:hover:text-blue-400" type="submit">
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}

function RegisterButton() {
  return (
    <Link href="/registration" className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-gray-950 dark:hover:bg-sky-900 dark:hover:text-blue-400">
      <div className="hidden md:block">Register</div>
      <ArrowRightIcon className="w-5 md:w-6" />
    </Link>
  );
}