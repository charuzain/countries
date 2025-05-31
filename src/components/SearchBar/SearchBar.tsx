import { FaSearch } from 'react-icons/fa';
import styles from '../SearchBar/SearchBar.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountries } from '../../slice/countrySlice';

const SearchBar = () => {
  const [search, setSearch] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(searchCountries(search));
    }, 400);

    return () => clearTimeout(delay);
  }, [search, dispatch]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // dispatch(searchCountries(e.target.value));
  };

  return (
    <div className={styles['search']}>
      <FaSearch className={styles['search-icon']} />
      <input
        placeholder="Search for a country...."
        className={styles['search-input']}
        onChange={onChangeHandler}
        value={search}
      />
    </div>
  );
};

export default SearchBar;
