import styles from './CoountryCard.module.css';

const CountryCard = ({
  name,
  population,
  region,
  capital,
  flag,
}: {
  name: string;
  population: number;
  region: string;
  capital: string[];
  flag: string;
}) => {
  return (
    <li className={styles['country-card']}>
      <div className={styles['image-box']}>
        <img src={flag} alt={`${name} flag`} className={styles['image']} />
      </div>
      <p className={styles['country-name']}>{name}</p>
      <div className={styles['country-details']}>
        <p className={styles['country-detail-label']}>
          Population:
          <span className={styles['country-info']}>   {population}</span>
        </p>
        <p className={styles['country-detail-label']}>
          Region:
          <span className={styles['country-info']}> {region}</span>
        </p>
        <p className={styles['country-detail-label']}>
          Capital:
          <span className={styles['country-info']}> {capital}</span>
        </p>
      </div>
    </li>
  );
};

export default CountryCard;
