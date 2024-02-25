import FrontDashLogo from '@/app/ui/FrontashLogo';
import EditAccountForm from '@/app/ui/dashboard/account/edit-account-form';

export default async function AccountPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[800px] flex-col space-y-2.5 p-4 md:-mt-32">
        <EditAccountForm />
      </div>
    </main>
  );
  }