import { useNavigate } from 'react-router';
import styles from './BackButton.module.css';
import { BiArrowBack } from 'react-icons/bi';

const BackButton = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate('/');
  };
  return (
    <div className={styles['btn-container']}>
      <button onClick={backHandler} className={styles['back-btn']}>
        <BiArrowBack />
        Back
      </button>
    </div>
  );
};

export default BackButton;
