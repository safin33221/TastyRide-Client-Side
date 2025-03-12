import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';

const MainLayout = () => {
  return (
    <div>
      <nav>
        <Navbar />
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
