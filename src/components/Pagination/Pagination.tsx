import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import styles from './Pagination.module.css';
import type { AppDispatch } from '../../app/store';
import { setPageNum } from '../../slice/countrySlice';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const Pagination = () => {
  const { filteredData } = useSelector((state: RootState) => state.country);

  const dispatch = useDispatch<AppDispatch>();

  const { currentPageNum } = useSelector((state: RootState) => state.country);

  const numCountries = filteredData.length;
  const numOfPages = Math.ceil(numCountries / 20);

  const prevButtonHandler = () => {
    if (currentPageNum > 1) {
      dispatch(setPageNum(currentPageNum - 1));
    }
  };

  const nextButtonHandler = () => {
    if (currentPageNum < numOfPages) {
      dispatch(setPageNum(currentPageNum + 1));
    }
  };

  const generatePageNum = (): number[] => {
    const pageNumbers: number[] = [];
    if (numOfPages <= 5) {
      for (let i = 1; i <= numOfPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPageNum <= 3) {
        pageNumbers.push(1, 2, 3, 4, 5);
      } else if (currentPageNum >= numOfPages - 2) {
        for (let i = numOfPages - 4; i <= numOfPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPageNum - 2; i <= currentPageNum + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

  return (
    <div className={styles['btn-container']}>
      <button
        disabled={currentPageNum === 1}
        onClick={prevButtonHandler}
        className={styles['btn']}
      >
        <IoIosArrowBack />
        Prev
      </button>
      <div className={styles['numBtn-container']}>
        {generatePageNum().map((num) => (
          <button
            key={num}
            onClick={() => dispatch(setPageNum(num))}
            className={`${styles['num-btn']} ${
              num === currentPageNum ? styles['active'] : ''
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        disabled={currentPageNum === numOfPages}
        onClick={nextButtonHandler}
        className={styles['btn']}
      >
        Next
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
