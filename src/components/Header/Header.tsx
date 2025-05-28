import { FaMoon } from 'react-icons/fa';
import { FaRegMoon } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { setTheme } from '../../slice/themeSlice';
import styles from '../Header/Header.module.css';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { mode } = useSelector((state: RootState) => state.theme);
  console.log(mode);

  const themeHandler = () => {
    if (mode === 'light') {
      dispatch(setTheme('dark'));
    } else {
      dispatch(setTheme('light'));
    }
  };

  return (
    <header className={styles['header']}>
      <p className={styles['header-title']}>Where in the world ?</p>
      <div className={styles['theme-container']}>
        <div onClick={themeHandler}>
          {mode === 'light' ? <FaMoon /> : <FaRegMoon />}
        </div>
        <span className={styles['theme']}>{mode === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
      </div>
    </header>
  );
};

export default Header;
