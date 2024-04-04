'use server';

import EditPasswordForm from '@/app/ui/dashboard/account/edit-password-form';
import ContactInfoForm from '../ui/dashboard/account/edit-contactInfo-form';
import { getContactInfo } from '../lib/employees';

export default async function AccountPage() {
  let contactInfo = (await getContactInfo())[0];
  console.log(contactInfo);

  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[800px] flex-col space-y-2.5 p-4">
        <EditPasswordForm />
        <ContactInfoForm info={contactInfo} />
      </div>
    </main>
  );
  }