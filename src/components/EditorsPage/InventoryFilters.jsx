import React from 'react';
import './InventoryFilters.css';

function InventoryFilters({ newItem, filters, filterOptions, handleFilterChange }) {
  return (
    <div className="inventory-list headers">
      {Object.keys(newItem).map((key) => (
        <div key={key}>
          <span>{key}</span>
          <div className="inventory-list filters">
            <select name={key} value={filters[key] || ''} onChange={handleFilterChange}>
              <option value="">All</option>
              {filterOptions[key]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InventoryFilters;
