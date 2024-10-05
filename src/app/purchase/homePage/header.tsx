import Link from "next/link";
import Cart from "./cart";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome to SnapSavvy!!! 🙂</h1>
        <nav>
          <ul className="flex items-center space-x-6">
            <li><a href="#" className="text-white hover:underline">Home</a></li>
            <li><a href="purchase" className="text-white hover:underline">Products</a></li>
            <li>
              <Link href="/purchase/viewOrder">
                <Cart />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
