import { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styles from './Filter.module.css';
import { useDispatch } from 'react-redux';
// import type { RootState, AppDispatch } from '../../app/store';
import { filterCountries } from '../../slice/countrySlice';

const Filter = () => {
  const [selectFilter, setSelectFilter] = useState<boolean>(false);

  const [filter, setfilter] = useState<string>('');

  const dispatch = useDispatch();
  //  const dispatch = useDispatch<AppDispatch>();

  const filterClickHandler = () => {
    setSelectFilter(!selectFilter);
  };

  const filterSelectHandler = (value: string) => {
    setfilter(value);
    setSelectFilter(!selectFilter);
    dispatch(filterCountries(value))
  };
  return (
    <div className={styles['filter-container']}>
      <button onClick={filterClickHandler} className={styles['filter-btn']}>
        <span>{!filter ? 'Filter By Region' : filter}</span>
        <i>
          {selectFilter ? (
            <MdKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </i>
      </button>
      {selectFilter && (
        <ul className={styles['filter-list']}>
          <li onClick={() => filterSelectHandler('All')}>All</li>
          <li onClick={() => filterSelectHandler('Africa')}>Africa</li>
          <li onClick={() => filterSelectHandler('Americas')}>Americas</li>
          <li onClick={() => filterSelectHandler('Asia')}>Asia</li>
          <li onClick={() => filterSelectHandler('Antarctic')}>Antarctic</li>
          <li onClick={() => filterSelectHandler('Oceania')}>Oceania</li>
          <li onClick={() => filterSelectHandler('Europe')}>Europe</li>
        </ul>
      )}
    </div>
  );
};

export default Filter;
