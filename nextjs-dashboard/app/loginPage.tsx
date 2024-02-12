import AcmeLogo from '@/app/ui/FrontashLogo';
import LoginForm from '@/app/ui/login';
import { Button } from '@/app/ui/button';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-orange-500">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
        <div className="flex h-8 items-end space-x-1">
          <Button className="w-full">New Users? Create Account</Button>
          </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent" />
    </main>
  );
}