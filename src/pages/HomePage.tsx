import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { fetchCountries } from '../slice/countrySlice';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/Filter/Filter';
import CountryList from '../components/CountryList/CountryList';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { status } = useSelector(
    (state: RootState) => state.country
  );

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
    <>
      <SearchBar />
      <Filter />
      <CountryList />
    </>
  );
};

export default HomePage;
