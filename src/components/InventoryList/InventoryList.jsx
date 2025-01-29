import React from 'react';
import './InventoryList.css';

function InventoryList({ filteredItems, removeItem }) {
  return (
    <>
      {filteredItems.map((item, index) => (
        <div className="inventory-list row" key={index}>
          {Object.keys(item).map((key) => (
            <div key={key}>{item[key]}</div>
          ))}
          <div className="delete-btn" onClick={() => removeItem(index)}>
            X
          </div>
        </div>
      ))}
    </>
  );
}

export default InventoryList;
