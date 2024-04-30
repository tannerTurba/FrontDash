'use server';

import { signIn, changeCredentials } from '@/auth';
import { AuthError } from 'next-auth';
import { registerRestaurant, updateHours } from '@/app/lib/restaurant';
import { registerDriver, registerEmployee, registerFdEmployee, updateContactInfo } from './employees';

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

export async function submitEmployee (
  prevState: string | undefined,
  formData: FormData
) {
  const data = {
    manager: formData.get('manager').toString(),
    firstName: formData.get('first-name').toString(),
    lastName: formData.get('last-name').toString(),
    phone: formData.get('phone').toString()
  };
  
  return await registerEmployee(data);
}

export async function submitDriver (
  prevState: string | undefined,
  formData: FormData
) {
  const data = {
    firstName: formData.get('first-name').toString(),
    lastName: formData.get('last-name').toString(),
    phone: formData.get('phone').toString()
  };
  
  return await registerDriver(data);
}

export async function submitFdEmployee (
  prevState: string | undefined,
  formData: FormData
) {
  const data = {
    firstName: formData.get('first-name').toString(),
    lastName: formData.get('last-name').toString(),
    phone: formData.get('phone').toString()
  };
  
  return await registerFdEmployee(data);
}

export async function changeHours(
  prevState: string | undefined,
  formData: FormData
) {
  const data = {
    sunOpen: '',
    sunClose: '',
    monOpen: '',
    monClose: '',
    tuesOpen: '',
    tuesClose: '',
    wedOpen: '',
    wedClose: '',
    thurOpen: '',
    thurClose: '',
    friOpen: '',
    friClose: '',
    satOpen: '',
    satClose: ''
  };

  if (formData.get('Sunday-checkbox') === 'on') {
    data.sunOpen = formData.get('Sunday-open').toString();
    data.sunClose = formData.get('Sunday-close').toString();
  }
  else {
    data.sunOpen = '';
    data.sunClose = '';
  }

  if (formData.get('Monday-checkbox') === 'on') {
    data.monOpen = formData.get('Monday-open').toString();
    data.monClose = formData.get('Monday-close').toString();
  }
  else {
    data.monOpen = '';
    data.monClose = '';
  }

  if (formData.get('Tuesday-checkbox') === 'on') {
    data.tuesOpen = formData.get('Tuesday-open').toString();
    data.tuesClose = formData.get('Tuesday-close').toString();
  }
  else {
    data.tuesOpen = '';
    data.tuesClose = '';
  }

  if (formData.get('Wednesday-checkbox') === 'on') {
    data.wedOpen = formData.get('Wednesday-open').toString();
    data.wedClose = formData.get('Wednesday-close').toString();
  }
  else {
    data.wedOpen = '';
    data.wedClose = '';
  }

  if (formData.get('Thursday-checkbox') === 'on') {
    data.thurOpen = formData.get('Thursday-open').toString();
    data.thurClose = formData.get('Thursday-close').toString();
  }
  else {
    data.thurOpen = '';
    data.thurClose = '';
  }

  if (formData.get('Friday-checkbox') === 'on') {
    data.friOpen = formData.get('Friday-open').toString();
    data.friClose = formData.get('Friday-close').toString();
  }
  else {
    data.friOpen = '';
    data.friClose = '';
  }

  if (formData.get('Saturday-checkbox') === 'on') {
    data.satOpen = formData.get('Saturday-open').toString();
    data.satClose = formData.get('Saturday-close').toString();
  }
  else {
    data.satOpen = '';
    data.satClose = '';
  }

  return await updateHours(data);
}