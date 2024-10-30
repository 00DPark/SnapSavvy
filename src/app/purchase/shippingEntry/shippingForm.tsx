import React, { useState } from 'react';
import Footer from '../homePage/footer';
import Header from '../homePage/header';
import { setCustomerName, setCustomerAddressCity, setCustomerAddressPostalCode, setCustomerAddressCountry, setCustomerAddressState, setCustomerAddressStreet } from '../helper/checkoutHelper';

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface ShippingDetails {
  name: string;
  address: Address;
}

interface ShippingFormProps {
  onSubmit: (shippingDetails: ShippingDetails) => void;
}

const ShippingForm = ({ onSubmit }: ShippingFormProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, address });
  };

  return (
    <div> 
      <Header /> 
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {setName(e.target.value); setCustomerName(e.target.value)}}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700">Street:</label>
              <input
                type="text"
                value={address.street}
                onChange={(e) => {setAddress({ ...address, street: e.target.value }); setCustomerAddressStreet(e.target.value)}}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700">City:</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => {setAddress({ ...address, city: e.target.value }); setCustomerAddressCity(e.target.value)}}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700">State:</label>
              <input
                type="text"
                value={address.state}
                onChange={(e) => {setAddress({ ...address, state: e.target.value }); setCustomerAddressState(e.target.value)}}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code:</label>
              <input
                type="text"
                value={address.postalCode}
                onChange={(e) => {setAddress({ ...address, postalCode: e.target.value }); setCustomerAddressPostalCode(e.target.value)}}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700">Country:</label>
              <input
                type="text"
                value={address.country}
                onChange={(e) => {setAddress({ ...address, country: e.target.value }); setCustomerAddressCountry(e.target.value)}}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingForm;