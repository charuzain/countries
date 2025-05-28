import { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styles from './Filter.module.css';

const Filter = () => {
  const [selectFilter, setSelectFilter] = useState<boolean>(false);

  const [filter, setfilter] = useState<string>('');

  const filterClickHandler = () => {
    setSelectFilter(!selectFilter);
  };

  const filterSelectHandler = (value: string) => {
    setfilter(value);
    setSelectFilter(!selectFilter);
  };
  return (
    <div className={styles['filter-container']}>
      <button onClick={filterClickHandler}
        className={styles['filter-btn']}
      >
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
          <li onClick={() => filterSelectHandler('Africa')}>Africa</li>
          <li onClick={() => filterSelectHandler('Americas')}>Americas</li>
          <li onClick={() => filterSelectHandler('Asia')}>Asia</li>
        </ul>
      )}
    </div>
  );
};

export default Filter;
