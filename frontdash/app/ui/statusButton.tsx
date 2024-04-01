import React from 'react';
import { updateUserStatus } from '@/scripts/employee';

function UpdateStatusButton({ userId, currentStatus }) {
  const handleClick = async () => {
    try {
      // Toggle the status
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await updateUserStatus(userId, newStatus);
      // You might want to handle success feedback here (e.g., show a notification)
      console.log('User status updated successfully');
    } catch (error) {
      console.error('Error updating user status:', error);
      // You might want to handle error feedback here (e.g., show an error message)
    }
  };

  return (
    <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">
      {currentStatus === 'active' ? 'Deactivate' : 'Activate'} User
    </button>
  );
}

export default UpdateStatusButton;