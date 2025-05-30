import type { CountryDetail } from '../../slice/countrySlice';
import styles from './CountryInfo.module.css';

const CountryInfo = ({
  selectedCountry,
}: {
  selectedCountry: CountryDetail;
}) => {
  return (
    <div className={styles['info-container']}>
      <h1 className={styles['country-name']}>
        {selectedCountry?.name?.common}
      </h1>
      <div className={styles['country-details']}>
        <p className={styles['info-label']}>
          Native Name:{' '}
          <span className={styles['info']}>
            {selectedCountry?.name?.nativeName &&
              Object.values(selectedCountry.name.nativeName)[0]?.common}
          </span>
        </p>

        <p className={styles['info-label']}>
          Population:{' '}
          <span className={styles['info']}>{selectedCountry?.population}</span>
        </p>
        <p className={styles['info-label']}>
          Region:
          <span className={styles['info']}>{selectedCountry?.region}</span>
        </p>
        <p className={styles['info-label']}>
          Sub Region:
          <span className={styles['info']}>{selectedCountry?.subregion}</span>
        </p>
        <p className={styles['info-label']}>
          Capital:
          <span className={styles['info']}>{selectedCountry?.capital}</span>
        </p>
      </div>
    </div>
  );
};

export default CountryInfo;
