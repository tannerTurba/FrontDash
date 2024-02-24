import FrontDashLogo from '@/app/ui/FrontashLogo';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <FrontDashLogo />

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0">
        <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>
          FrontDash is a food delivery 
          service connecting customers with a wide array of local restaurants and eateries. With its user-friendly 
          platform, customers can easily browse menus, place orders, and receive their food without leaving the comfort of their home. 
          Offering an extensive selection of cuisines, DoorDash provides convenience and quality, making it a go-to choice for food 
          enthusiasts seeking diverse dining experiences delivered straight to their doorstep.
        </p>
      </div>
      <div className="flex h-8 items-center justify-center space-x-1">
        <Link
          href="/login"
          className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Register</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 flex items-center justify-center">
        <p>Created by: Matthew Moyer, Tanner Turba, and Samuel Evanson</p>
      </div>
    </main>
  );
}
