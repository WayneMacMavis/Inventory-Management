import React from 'react';
import './StockTakeList.css';

function StockTakeList() {
  return (
    <ul className="stock-take-list">
      <li>Item 1 - <input type="number" placeholder="Quantity" /></li>
      <li>Item 2 - <input type="number" placeholder="Quantity" /></li>
    </ul>
  );
}

export default StockTakeList;
