import React from 'react';
import './style.css';
const Filter = ({ minPrice, maxPrice, updateMaxPrice, updateMinPrice }) => {
  return (
    <div className="slidervDiv">
      <input
        min={0}
        max={200}
        onChange={updateMinPrice}
        type="range"
        value={minPrice}
        defaultValue={minPrice}
      />
      <input
        min={0}
        max={200}
        className="b"
        onChange={updateMaxPrice}
        type="range"
        value={maxPrice}
        defaultValue={maxPrice}
      />
    </div>
  );
};

export default Filter;
