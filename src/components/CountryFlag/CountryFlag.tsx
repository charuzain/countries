import styles from './CountryFlag.module.css';
interface Props {
  flag?: string;
  name?: string;
}
const CountryFlag = ({ flag, name }: Props) => {
  return (
    <div className={styles['flag-container']}>
      <img
        src={flag}
        alt={`Flag of ${name || 'Country'}`}
        className={styles['flag']}
      />
    </div>
  );
};

export default CountryFlag;
