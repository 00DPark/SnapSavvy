import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Street:</label>
        <input
          type="text"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          required
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          value={address.postalCode}
          onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          required
        />
      </div>
      <button type="submit">Proceed to Payment</button>
    </form>
  );
};

export default ShippingForm;
