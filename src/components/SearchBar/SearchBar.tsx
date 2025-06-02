import { FaSearch } from 'react-icons/fa';
import styles from '../SearchBar/SearchBar.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCountries } from '../../slice/countrySlice';
import type { RootState } from '../../app/store';

const SearchBar = () => {
  const { status, searchTerm } = useSelector(
    (state: RootState) => state.country
  );
  const [search, setSearch] = useState<string>(searchTerm);

  const dispatch = useDispatch();

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(searchCountries(search));
    }, 400);
    return () => clearTimeout(delay);
  }, [search, dispatch, status]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles['search']}>
      <FaSearch className={styles['search-icon']} />
      <input
        placeholder="Search for a country...."
        className={styles['search-input']}
        onChange={onChangeHandler}
        value={search}
        type='search'
      />
    </div>
  );
};

export default SearchBar;
