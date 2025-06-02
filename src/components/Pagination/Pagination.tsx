import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import styles from './Pagination.module.css';
import type { AppDispatch } from '../../app/store';
import { setPageNum } from '../../slice/countrySlice';

const Pagination = () => {
  const { filteredData } = useSelector((state: RootState) => state.country);

  // const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  const { currentPageNum } = useSelector((state: RootState) => state.country);

  const numCountries = filteredData.length;
  const numOfPages = Math.ceil(numCountries / 20);

  const prevButtonHandler = () => {
    if (currentPageNum > 1) {
      dispatch(setPageNum(currentPageNum - 1));
      // setCurrentPageNum(currentPageNum - 1);
    }
  };

  const nextButtonHandler = () => {
    if (currentPageNum < numOfPages) {
      dispatch(setPageNum(currentPageNum + 1));
      // setCurrentPageNum(currentPageNum + 1);
    }
  };

  // const setPageNum = (num: number) => {
  //   setCurrentPageNum(num);
  // };

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
        Prev
      </button>
      {generatePageNum().map((num) => (
        <button
          key={num}
          onClick={() => dispatch(setPageNum(num))}
          className={num === currentPageNum ? styles['active'] : ''}
        >
          {num}
        </button>
      ))}

      {/* {currentPageNum <= 2 ? (
        <>
          <button onClick={() => setCurrentPageNum(1)}>1</button>
          <button onClick={() => setCurrentPageNum(2)}>2</button>
          <button onClick={() => setCurrentPageNum(3)}>3</button>
          <button onClick={() => setCurrentPageNum(4)}>4 </button>
          <button onClick={() => setCurrentPageNum(5)}>5</button>
        </>
      ) : (
        <>
          <button onClick={() => setCurrentPageNum(currentPageNum - 2)}>
            {currentPageNum - 2}
          </button>
          <button onClick={() => setCurrentPageNum(currentPageNum - 1)}>
            {currentPageNum - 1}
          </button>
          <button onClick={() => setCurrentPageNum(currentPageNum)}>
            {currentPageNum}
          </button>
          <button onClick={() => setCurrentPageNum(currentPageNum + 1)}>
            {currentPageNum + 1}{' '}
          </button>
          <button onClick={() => setCurrentPageNum(currentPageNum + 2)}>
            {currentPageNum + 2}
          </button>
        </>
      )} */}
      <button
        disabled={currentPageNum === numOfPages}
        onClick={nextButtonHandler}
        className={styles['btn']}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
