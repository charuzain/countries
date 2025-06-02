import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import CountryCard from '../CountryCard/CountryCard';
import styles from './CountryList.module.css';
import type { Country } from '../../slice/countrySlice';

const CountryList = () => {
  const {
    filteredData,
    status,
    currentPageNum,
  } = useSelector((state: RootState) => state.country);

  if (status === 'loading') {
    return <h1>Loading....</h1>;
  }
  if (status === 'error') {
    return <h1>There was an error loading this page....</h1>;
  }

  console.log(`country list rendered`)
  console.log(filteredData.length);
  console.log(currentPageNum)

  const countriesCurrentPage = (pageNum: number): Country[] => {
    const startIndex = (pageNum - 1) * 20;
    const endIndex = pageNum * 20 - 1;
    const elem = filteredData.slice(startIndex, endIndex + 1);
    return elem;
  };

  if (filteredData.length === 0) {
    return <h2>No countries found.</h2>;
  }
  return (
    <ul className={styles['country-list']}>
      {countriesCurrentPage(currentPageNum).map((country) => (
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
