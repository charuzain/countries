import type { CountryDetail } from '../../slice/countrySlice';
import styles from './CountryMetaInfo.module.css';

const CountryMetaInfo = ({ country }: { country: CountryDetail }) => {
  return (
    <>
      <div className={styles['country-detils']}>
        <p className={styles['info-label']}>
          Top level domain:{' '}
          <span className={styles['info']}>{country?.tld}</span>
        </p>
        <p className={styles['info-label']}>
          Currencies:
          {country?.currencies
            ? Object.values(country?.currencies).map((c) => (
                <span key={c.name} className={styles['info']}>
                  {c.name}
                </span>
              ))
            : null}
        </p>
        <p className={styles['info-label']}>
          Language:
          {country?.languages
            ? Object.values(country?.languages).map((lang) => (
                <span key={lang} className={styles['info']}>
                  {lang}
                </span>
              ))
            : null}
        </p>
      </div>
    </>
  );
};

export default CountryMetaInfo;
