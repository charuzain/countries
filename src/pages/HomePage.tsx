import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { fetchCountries } from '../slice/countrySlice';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: countryData, status } = useSelector(
    (state: RootState) => state.country
  );
  console.log(countryData);
  console.log(status);

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
      <h1>Country List</h1>
    </>
  );
};

export default HomePage;
