'use server';

import { signIn, changeCredentials } from '@/auth';
import { AuthError } from 'next-auth';
import { registerRestaurant } from '@/app/lib/restaurant';

export async function authenticate (
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } 
  catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function changePassword (
  prevState: string | undefined,
  formData: FormData,
) {
  const password = formData.get('password').toString();
  const confirmPassword = formData.get('confirm-password').toString();
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return await changeCredentials(password);
}

export async function submitRestaurant (
  prevState: string | undefined,
  formData: FormData,
) {
  const data = {
    name: formData.get('name').toString(),
    about: formData.get('about').toString(),
    firstName: formData.get('firstName').toString(),
    lastName: formData.get('lastName').toString(),
    email: formData.get('email').toString(),
    phone: formData.get('phone').toString(),
    buildingNumber: formData.get('buildingNumber').toString(),
    unitNumber: formData.get('unitNumber').toString(),
    streetAddress: formData.get('streetAddress').toString(),
    city: formData.get('city').toString(),
    state: formData.get('state').toString(),
    zip: formData.get('zip').toString()
  };

  return await registerRestaurant(data);
}