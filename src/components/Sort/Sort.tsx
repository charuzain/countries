import { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useDispatch } from 'react-redux';
// import type { RootState, AppDispatch } from '../../app/store';
import { sortCountries } from '../../slice/countrySlice';
import styles from './Sort.module.css';

const sortOptions = {
  'pop-desc': 'Population (desc)',
  'pop-asc': 'Population (asc)',
  'name-asc': 'Country Name (A-Z)',
  'name-desc': 'Country Name (Z-A)',
};

type SortOptionKey = 'pop-desc' | 'pop-asc' | 'name-asc' | 'name-desc';

const Sort = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectedSortBy, setSelectedSortBy] = useState<SortOptionKey | ''>('');

  const dispatch = useDispatch();

  const togleDropDownHandler = () => {
    setShowDropDown(!showDropDown);
  };

  const handleSort = (val: SortOptionKey) => {
    setSelectedSortBy(val);
    dispatch(sortCountries(val));
    setShowDropDown(!showDropDown);
  };

  return (
    <div className={styles['filter-container']}>
      <button className={styles['filter-btn']} onClick={togleDropDownHandler}>
        <span>{selectedSortBy ? sortOptions[selectedSortBy] : 'Sort By'}</span>
        <i>
          {showDropDown ? (
            <MdKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </i>
      </button>
      {showDropDown && (
        <ul className={styles['filter-list']}>
          <li onClick={() => handleSort('pop-desc')}>Population (desc)</li>
          <li onClick={() => handleSort('pop-asc')}>Population (asc)</li>
          <li onClick={() => handleSort('name-asc')}>Contry Name (a-z)</li>
          <li onClick={() => handleSort('name-desc')}>Contry Name (z-a)</li>
        </ul>
      )}
    </div>
  );
};

export default Sort;
