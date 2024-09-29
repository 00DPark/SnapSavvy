// import Purchase from './components/purchase';

// const Home = () => {
//   return(
//     <div>
//     <Purchase />
//   </div>
//   );

// };

// export default Home;
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/purchase">Purchase Products</Link> {/* Link to /purchase */}
        </li>
      </ul>
    </div>
  );
};

export default Home;
