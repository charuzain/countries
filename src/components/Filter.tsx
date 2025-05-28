import { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const Filter = () => {
  const [selectFilter, setSelectFilter] = useState<boolean>(false);

  const [filter, setfilter] = useState<string>('');

  const filterClickHandler = () => {
    setSelectFilter(!selectFilter);
  };

  const filterSelectHandler = (value: string) => {
    console.log(value);
    setfilter(value);
    setSelectFilter(!selectFilter);
  };
  return (
    <>
      <button onClick={filterClickHandler}>
        <span>{!filter ? 'Filter By Region' : filter}</span>
        <i>
          {selectFilter ? (
            <MdOutlineKeyboardArrowDown />
          ) : (
            <MdKeyboardArrowUp />
          )}
        </i>
      </button>
      {selectFilter && (
        <ul>
          <li onClick={() => filterSelectHandler('Africa')}>Africa</li>
          <li onClick={() => filterSelectHandler('Americas')}>Americas</li>
          <li onClick={() => filterSelectHandler('Asia')}>Asia</li>
        </ul>
      )}
    </>
  );
};

export default Filter;
