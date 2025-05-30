import styles from './CountryFlag.module.css';
interface Props {
  flag?: string;
  name?: string;
}
const CountryFlag = ({ flag, name }: Props) => {
  return (
    <div>
      <img src={flag || ''} alt={`Flag of ${name || 'Country'}`} />
    </div>
  );
};

export default CountryFlag;
