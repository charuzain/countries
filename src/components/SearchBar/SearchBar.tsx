import { FaSearch } from 'react-icons/fa';
import styles from '../SearchBar/SearchBar.module.css';
import { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState<string>('');

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
      />
    </div>
  );
};

export default SearchBar;
