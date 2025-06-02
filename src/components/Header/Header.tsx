import { FaMoon } from 'react-icons/fa';
import { FaRegMoon } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { setTheme } from '../../slice/themeSlice';
import styles from '../Header/Header.module.css';
import { Link } from 'react-router';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { mode } = useSelector((state: RootState) => state.theme);

  const themeHandler = () => {
    if (mode === 'light') {
      dispatch(setTheme('dark'));
    } else {
      dispatch(setTheme('light'));
    }
  };

  return (
    <header className={styles['header']}>
      <div className={styles['header-container']}>
        <Link to={'/'} className={styles['header-title']}>
          Where in the world ?
        </Link>
        <div className={styles['theme-container']} onClick={themeHandler}>
          <div>{mode === 'light' ? <FaMoon /> : <FaRegMoon />}</div>
          <span className={styles['theme']}>
            {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
