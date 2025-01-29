import React from 'react';
import StockTakeList from '../StockTakeList/StockTakeList';
import './StockTakePage.css';

function StockTakePage() {
  return (
    <div className="stock-take-page">
      <h1>Stock Take Page</h1>
      <StockTakeList />
    </div>
  );
}

export default StockTakePage;
