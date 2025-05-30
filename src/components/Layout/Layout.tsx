import { Outlet } from 'react-router';
import Header from '../Header/Header';
// import Footer from './Footer';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <Header />
      <div className={styles['main-container']}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
