import React from 'react';

const CountryCard = ({
  name,
  population,
  region,
  capital,
  flag,
}: {
  name: string;
  population: number;
  region: string;
  capital: string[];
  flag: string;
}) => {
  return (
    <li>
      <div>
        <img src={flag} alt={`${name} flag`} />
      </div>
      <div>
        <p> Name:{name}</p>
        <p>Population{population}</p>
        <p>Region{region}</p>
        <p>Capital{capital}</p>
      </div>
    </li>
  );
};

export default CountryCard;
