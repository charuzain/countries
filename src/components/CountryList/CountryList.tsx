import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import CountryCard from '../CountryCard/CountryCard';
import styles from './CountryList.module.css';

const CountryList = () => {
  const { data, status } = useSelector((state: RootState) => state.country);
  console.log(data);
  if (status === 'loading') {
    return <h1>Loading....</h1>;
  }
  if (status === 'error') {
    return <h1>There was an error loading this page....</h1>;
  }
  return (
    <ul className={styles['country-list']}>
      {data.map((country) => (
        <CountryCard
          key={country.name}
          name={country.name}
          population={country.population}
          region={country.region}
          capital={country.capital}
          flag={country.flag}
        />
      ))}
    </ul>
  );
};

export default CountryList;
