import { useNavigate } from 'react-router';
import styles from './BackButton.module.css';

const BackButton = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate('/');
  };
  return (
    <button onClick={backHandler} className={styles['back-btn']}>
      Back
    </button>
  );
};

export default BackButton;
