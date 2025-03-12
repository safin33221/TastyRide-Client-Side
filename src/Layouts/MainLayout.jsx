import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Headroom from 'react-headroom';
import Footer from '../Shared/Footer';

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
        <Footer/>
      </footer>
    </div>
  );
};

export default MainLayout;
