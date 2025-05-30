import { Link } from 'react-router';
import type { Country } from '../../slice/countrySlice';
import styles from './BorderCountries.module.css'

const BorderCountries = ({
  countryData,
  borders,
}: {
  countryData: Country[];
  borders?: string[];
}) => {
  const neighbourName = (borders: string[]): string[] => {
    return borders
      .map(
        (border) => countryData.find((country) => country.cca3 === border)?.name
      )
      .filter((name): name is string => Boolean(name));
  };

  if (borders?.length === 0 || !borders) {
    return <p>'No Neighbouring country found'</p>;
  }
  return (
    <ul className={styles['border-list']}>
      {neighbourName(borders).map((border, index) => (
        <li key={index} className={styles['border']}>
          <Link to={`/${border}`} className={styles['border-link']}>
            {border}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BorderCountries;
