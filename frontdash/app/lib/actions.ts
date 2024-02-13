'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/dist/server/api-utils';

export async function authenticate (
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    let x = await signIn('credentials', formData, {
      redirect: "false"
    });
    console.log(x);
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