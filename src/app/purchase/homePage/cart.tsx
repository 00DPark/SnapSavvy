    const Cart = () => {
    return (
      <button
        className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
        aria-label="Cart"
      >
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4 8L5 21h14M7 13l-1-5h16m-4 10a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </button>
    );
  };
  
  export default Cart;
  