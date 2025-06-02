import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { fetchCountries } from '../slice/countrySlice';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/Filter/Filter';
import CountryList from '../components/CountryList/CountryList';

// css import
import styles from './HomePage.module.css';
import Sort from '../components/Sort/Sort';
import Pagination from '../components/Pagination/Pagination';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { status, data } = useSelector((state: RootState) => state.country);
  console.log(`status is ${status}`);

  useEffect(() => {
    if (status === 'idle' && data.length === 0) {
      dispatch(fetchCountries());
    } else if (status === 'error') {
      dispatch(fetchCountries());
    }
  }, [dispatch, status, data.length]);

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (status === 'error') {
    return <h1>Error..</h1>;
  }
  return (
    <main className={styles['main']}>
      <div className={styles['filter-container']}>
        <SearchBar />
        <div className={styles['filter-box']}>
          <Filter />
          <Sort />
        </div>
      </div>
      <CountryList />
      <Pagination />
    </main>
  );
};

export default HomePage;
