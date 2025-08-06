import React from "react";

const FilterDropdown = ({ filter, setFilter }) => {
  return (
    <>
      <section className="filter">
        <label htmlFor="filter">Filter:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">all</option>
          <option value="read">read</option>
          <option value="unread">unread</option>
        </select>
      </section>
    </>
  );
};

export default FilterDropdown;
