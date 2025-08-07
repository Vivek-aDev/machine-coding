import React from "react";

const FilterDropdown = ({ filter, setFilter }) => {
  return (
    <select
      className="filter-dropdown"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">All Movies</option>
      <option value="watchlist">watchlist</option>
    </select>
  );
};

export default FilterDropdown;
