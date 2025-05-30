// Hooks Import
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { fetchCountries, fetchCountryByName } from '../../slice/countrySlice';

// Components Import
import BorderCountries from '../../components/BorderCountries/BorderCountries';
import BackButton from '../../components/BackButton/BackButton';
import CountryFlag from '../../components/CountryFlag/CountryFlag';
import CountryInfo from '../../components/CountryInfo/CountryInfo';
import CountryMetaInfo from '../../components/CountryMetaInfo/CountryMetaInfo';
// css
import styles from './CountryDetail.module.css';

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
    <main className={styles['main-container']}>
      <BackButton />
      <div className={styles['detail-container']}>
        <CountryFlag
          flag={selectedCountry?.[0]?.flags?.png}
          name={selectedCountry?.[0]?.name?.common}
        />
        <div className={styles['detail-box']}>
          <div className={styles['detail-top-box']}>
            {selectedCountry?.[0] && (
              <CountryInfo selectedCountry={selectedCountry[0]} />
            )}

            {selectedCountry?.[0] && (
              <CountryMetaInfo country={selectedCountry?.[0]} />
            )}
          </div>
          <div className={styles['detail-bottom-box']}>
            <p className={styles['border']}>Border Countries:</p>
            <BorderCountries
              borders={selectedCountry?.[0]?.borders}
              countryData={countryData}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CountryDetail;
