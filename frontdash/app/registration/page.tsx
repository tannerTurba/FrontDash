import RegistrationForm from '@/app/ui/dashboard/registration/registration-form';

export default async function RegistrationPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[800px] flex-col space-y-2.5 p-4">
        <RegistrationForm />
      </div>
    </main>
  );
  } 