import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { useEffect } from 'react';
import { fetchCountryByName } from '../slice/countrySlice';
import { useParams } from 'react-router';

const CountryDetail = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const selectedCountry = useSelector(
    (state: RootState) => state.country.selectedCountry
  );
  
  console.log(selectedCountry);

  useEffect(() => {
    if (name) {
      dispatch(fetchCountryByName(name));
    }
  }, [dispatch, name]);

  return <div>CountryDetail</div>;
};

export default CountryDetail;
