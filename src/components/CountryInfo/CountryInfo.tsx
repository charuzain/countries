import type { CountryDetail } from '../../slice/countrySlice';

const CountryInfo = ({
  selectedCountry,
}: {
  selectedCountry: CountryDetail;
}) => {
  return (
    <>
      <p>{selectedCountry?.name?.common}</p>
      <div>
        <p>
          Native Name:{' '}
          {selectedCountry?.name?.nativeName &&
            Object.values(selectedCountry.name.nativeName)[0]?.common}
        </p>

        <p>
          Population <span>{selectedCountry?.population}</span>
        </p>
        <p>
          Region <span>{selectedCountry?.region}</span>
        </p>
        <p>
          Sub Region <span>{selectedCountry?.subregion}</span>
        </p>
        <p>
          Capital <span>{selectedCountry?.capital}</span>
        </p>
      </div>
    </>
  );
};

export default CountryInfo;
