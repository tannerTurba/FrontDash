import { useState } from 'react';

const OrderDetailsForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [street, setStreet] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, like sending data to a server or processing it locally.
    const orderDetails = {
      firstName,
      lastName,
      phoneNumber,
      address: {
        buildingNumber,
        street,
        unitNumber,
        city,
        state,
        zipCode,
      },
    };
    console.log(orderDetails);
    // You can add further logic here, like redirecting to another page.
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </label>
      <label>
        Building Number:
        <input
          type="text"
          value={buildingNumber}
          onChange={(e) => setBuildingNumber(e.target.value)}
          required
        />
      </label>
      <label>
        Street:
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
      </label>
      <label>
        Unit Number (Optional):
        <input
          type="text"
          value={unitNumber}
          onChange={(e) => setUnitNumber(e.target.value)}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State:
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Zip Code:
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
      </label>
      
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderDetailsForm;