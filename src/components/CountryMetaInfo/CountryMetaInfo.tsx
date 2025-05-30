import type { CountryDetail } from '../../slice/countrySlice';

const CountryMetaInfo = ({ country }: { country: CountryDetail }) => {
  return (
    <>
      <div>
        <p>
          Native Name:{' '}
          {country?.name?.nativeName &&
            Object.values(country.name.nativeName)[0]?.common}
        </p>

        <p>
          Population <span>{country?.population}</span>
        </p>
        <p>
          Region <span>{country?.region}</span>
        </p>
        <p>
          Sub Region <span>{country?.subregion}</span>
        </p>
        <p>
          Capital <span>{country?.capital}</span>
        </p>
      </div>
      <div>
        <p>
          Top level domain <span>{country?.tld}</span>
        </p>
        <p>
          Currencies :
          {country?.currencies
            ? Object.values(country?.currencies).map((c) => (
                <span key={c.name}>{c.name}</span>
              ))
            : null}
        </p>
        <p>
          Language:
          {country?.languages
            ? Object.values(country?.languages).map((lang) => (
                <span key={lang}>{lang}</span>
              ))
            : null}
        </p>
      </div>
    </>
  );
};

export default CountryMetaInfo;
