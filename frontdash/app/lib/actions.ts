'use server';

import { signIn, changeCredentials } from '@/auth';
import { AuthError } from 'next-auth';
import { registerRestaurant } from '@/app/lib/restaurant';
import { registerEmployee, updateContactInfo } from './employees';

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

export async function changeContactInfo (
  prevState: string | undefined,
  formData: FormData,
) {
  const data = {
    firstName: formData.get('first-name').toString(),
    lastName: formData.get('last-name').toString(),
    email: formData.get('email').toString(),
    phone: formData.get('phone').toString(),
    buildingNumber: formData.get('buildingNumber').toString(),
    unitNumber: formData.get('unitNumber').toString(),
    streetAddress: formData.get('street-address').toString(),
    city: formData.get('city').toString(),
    state: formData.get('state').toString(),
    zip: formData.get('postal-code').toString()
  };
  
  return await updateContactInfo(data);
}

export async function submitRestaurant (
  prevState: string | undefined,
  formData: FormData,
) {
  const data = {
    name: formData.get('name').toString(),
    about: formData.get('about').toString(),
    firstName: formData.get('first-name').toString(),
    lastName: formData.get('last-name').toString(),
    email: formData.get('email').toString(),
    phone: formData.get('phone').toString(),
    buildingNumber: formData.get('buildingNumber').toString(),
    unitNumber: formData.get('unitNumber').toString(),
    streetAddress: formData.get('street-address').toString(),
    city: formData.get('city').toString(),
    state: formData.get('state').toString(),
    zip: formData.get('postal-code').toString(),
  };
  
  return await registerRestaurant(data);
}

export async function changeStatus(prevState: string | undefined, id: number) {
  return updateUserStatus(id, prevState === 'active' ? 'inactive' : 'active');
}

export async function submitEmployee (
  prevState: string | undefined,
  formData: FormData
) {
  console.log(formData);
  const data = {
    manager: formData.get('manager').toString(),
    firstName: formData.get('first-name').toString(),
    lastName: formData.get('last-name').toString(),
    phone: formData.get('phone').toString()
  };
  
  return await registerEmployee(data);
}