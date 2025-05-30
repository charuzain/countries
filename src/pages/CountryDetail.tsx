// Hooks Import
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { fetchCountries, fetchCountryByName } from '../slice/countrySlice';

// Components Import
import BorderCountries from '../components/BorderCountries/BorderCountries';
import BackButton from '../components/BackButton/BackButton';
import CountryFlag from '../components/CountryFlag/CountryFlag';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import CountryMetaInfo from '../components/CountryMetaInfo/CountryMetaInfo';

const CountryDetail = () => {
  const { name } = useParams<{ name: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    selectedCountry,
    status,
    data: countryData,
    error,
  } = useSelector((state: RootState) => state.country);

  useEffect(() => {
    if (name) {
      dispatch(fetchCountryByName(name));
    }

    if (countryData.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, name]);

  if (status === 'loading') {
    return <p>Loading....</p>;
  }

  if (status === 'error') {
    return (
      <div>
        <p>{error || 'Error loading country data.'}</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <CountryFlag
        flag={selectedCountry?.[0]?.flags?.png}
        name={selectedCountry?.[0]?.name?.common}
      />
      {selectedCountry?.[0] && (
        <CountryInfo selectedCountry={selectedCountry[0]} />
      )}

      {selectedCountry?.[0] && (
        <CountryMetaInfo country={selectedCountry?.[0]} />
      )}
      <div>
        <p>Border Countries</p>
        <BorderCountries
          borders={selectedCountry?.[0]?.borders}
          countryData={countryData}
        />
      </div>
    </>
  );
};

export default CountryDetail;
