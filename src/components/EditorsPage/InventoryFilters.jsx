import React from 'react';
import Ripples from 'react-ripples';
import './InventoryFilters.css';

function InventoryFilters({ newItem, filters, filterOptions, handleFilterChange }) {
  return (
    <div className="inventory-filters-container inventory-list headers">
      {Object.keys(newItem).map((key) => (
        <div key={key} className="filter-control">
          <span>{key}</span>
          <Ripples className="ripples" during={600} color="rgba(0, 0, 0, 0.3)">
            <select name={key} value={filters[key] || ''} onChange={handleFilterChange}>
              <option value="">All</option>
              {filterOptions[key]?.map((option, index) => (
                <option key={`${key}-${index}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Ripples>
        </div>
      ))}
    </div>
  );
}

export default InventoryFilters;
