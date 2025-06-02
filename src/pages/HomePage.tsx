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

  const { status } = useSelector((state: RootState) => state.country);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

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
        <Filter />
        <Sort />
      </div>
      <CountryList />
      <Pagination />
    </main>
  );
};

export default HomePage;
