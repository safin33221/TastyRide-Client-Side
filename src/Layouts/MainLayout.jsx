import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Headroom from 'react-headroom';

const MainLayout = () => {
  return (
    <div>
      <nav>
        <Headroom>
        <Navbar />
        </Headroom>
      </nav>
      <main className=" mx-auto">
        <Outlet />
      </main>
      <footer>
        <h1>footer</h1>
      </footer>
    </div>
  );
};

export default MainLayout;
