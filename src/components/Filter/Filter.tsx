import { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styles from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterCountries } from '../../slice/countrySlice';
import type { RootState } from '../../app/store';
const Filter = () => {
  const [selectFilter, setSelectFilter] = useState<boolean>(false);

  const { selectedFilter } = useSelector((state: RootState) => state.country);

  const dispatch = useDispatch();

  const filterClickHandler = () => {
    setSelectFilter(!selectFilter);
  };

  const filterSelectHandler = (value: string) => {
    dispatch(filterCountries(value));
    setSelectFilter(false);
  };

  const regions = [
    'Africa',
    'Americas',
    'Asia',
    'Antarctic',
    'Oceania',
    'Europe',
  ];
  const displayFilterText = (filter: string) =>
    !filter || filter.toLowerCase() === 'all' ? 'Filter By Region' : `${filter[0].toUpperCase()}${filter.slice(1)}`;


  const dropdownItems =
    !selectedFilter || selectedFilter.toLowerCase() === 'all'
      ? regions 
      : ['All', ...regions]; 

  return (
    <div className={styles['filter-container']}>
      <button onClick={filterClickHandler} className={styles['filter-btn']}>
        <span>{displayFilterText(selectedFilter)}</span>
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
          {dropdownItems.map((region) => (
            <li
              key={region}
              onClick={() => filterSelectHandler(region)}
              className={styles['filter-item']}
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
