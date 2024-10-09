import Link from 'next/link';

const RedirectButton = () => {
  return (
    <div className="flex justify-center mt-4">
      <Link href="/purchase/shippingEntry" passHref>
        <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
          Go to Shipping Entry
        </button>
      </Link>
    </div>
  );
};

export default RedirectButton;
