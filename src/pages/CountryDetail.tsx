import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { useEffect } from 'react';
import { fetchCountryByName } from '../slice/countrySlice';
import { useParams } from 'react-router';

const CountryDetail = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCountry, status } = useSelector(
    (state: RootState) => state.country
  );

  console.log(selectedCountry);
  console.log(selectedCountry?.[0]?.name);
  console.log(selectedCountry?.[0]?.name?.common);

  // const lang = selectedCountry?.[0]?.languages;
  // const values = Object.values(lang);
  // console.log(values);

  useEffect(() => {
    if (name) {
      dispatch(fetchCountryByName(name));
    }
  }, [dispatch, name]);

  return (
    <>
      <div>
        <img src={selectedCountry?.[0]?.flags?.png} alt="" />
      </div>
      <p>{selectedCountry?.[0]?.name?.common}</p>

      <div>
        <p>Native Name:</p>
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
                <span>{c.name}</span>
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
          {selectedCountry?.[0]?.borders.map((border) => (
            <li>{border}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CountryDetail;
