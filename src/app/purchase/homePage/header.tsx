import Link from "next/link";
import Cart from "./cart";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome to SnapSavvy!!! 🙂</h1>
        <nav>
          <ul className="flex items-center space-x-6">
            <li><Link href="/" className="text-white hover:underline">Home</Link></li>
            <li><Link href="/about" className="text-white hover:underline">About</Link></li>
            <li><Link href="/contact" className="text-white hover:underline">Contact</Link></li>
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
