import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <FaCheckCircle className="text-gray-800 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-blue-600 mb-2">Payment Successful!</h1>
      <p className="text-lg text-gray-800 mb-6">Thank you for your purchase.</p>
      <div className="flex space-x-4">
        <Link href="/">
          <div className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-800 transition duration-300 ease-in-out">
            Go to Home
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
