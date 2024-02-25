'use server';

import { signIn, changeCredentials } from '@/auth';
import { AuthError } from 'next-auth';

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