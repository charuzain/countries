import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { useEffect } from 'react';
import { fetchCountries, fetchCountryByName } from '../slice/countrySlice';
import { useParams } from 'react-router';
import { Link } from 'react-router';

const CountryDetail = () => {
  const { name } = useParams<{ name: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const {
    selectedCountry,
    status,
    data: countryData,
  } = useSelector((state: RootState) => state.country);

  useEffect(() => {
    if (name) {
      dispatch(fetchCountryByName(name));
    }

    if (countryData.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, name]);

  const neighbourName = (borders: string[]): string[] => {
    return borders
      .map(
        (border) => countryData.find((country) => country.cca3 === border)?.name
      )
      .filter((name): name is string => Boolean(name));
  };

  if (status === 'loading') {
    return <p>Loading....</p>;
  }

  return (
    <>
      <div>
        <img
          src={selectedCountry?.[0]?.flags?.png}
          alt={`Flig of ${selectedCountry?.[0]?.name?.common}`}
        />
      </div>
      <p>{selectedCountry?.[0]?.name?.common}</p>

      <div>
        <p>
          Native Name:{' '}
          {selectedCountry?.[0]?.name?.nativeName &&
            Object.values(selectedCountry[0].name.nativeName)[0]?.common}
        </p>

        <p>
          Population <span>{selectedCountry?.[0]?.population}</span>
        </p>
        <p>
          Region <span>{selectedCountry?.[0]?.region}</span>
        </p>
        <p>
          Sub Region <span>{selectedCountry?.[0]?.subregion}</span>
        </p>
        <p>
          Capital <span>{selectedCountry?.[0]?.capital}</span>
        </p>
      </div>
      <div>
        <p>
          Top level domain <span>{selectedCountry?.[0]?.tld}</span>
        </p>
        <p>
          Currencies :{' '}
          {selectedCountry?.[0]?.currencies
            ? Object.values(selectedCountry?.[0]?.currencies).map((c) => (
                <span key={c.name}>{c.name}</span>
              ))
            : null}
        </p>
        <p>
          Language:
          {selectedCountry?.[0]?.languages
            ? Object.values(selectedCountry?.[0]?.languages).map((lang) => (
                <span key={lang}>{lang}</span>
              ))
            : null}
        </p>
      </div>
      <div>
        <p>Border Countries</p>
        <ul>
          {selectedCountry?.[0]?.borders
            ? neighbourName(selectedCountry?.[0]?.borders).map(
                (border, index) => (
                  <li key={index}>
                    <Link to={`/${border}`}>{border}</Link>
                  </li>
                )
              )
            : null}
        </ul>
      </div>
    </>
  );
};

export default CountryDetail;
