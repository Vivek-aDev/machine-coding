import React from "react";

const FilterDropdown = ({ filter, setFilter }) => {
  return (
    <>
      <section
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
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
