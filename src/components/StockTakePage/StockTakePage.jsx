import React, { useState, useEffect } from 'react';
import './StockTakePage.css';

function StockTakePage() {
  const [items, setItems] = useState([]);
  const [stockLevels, setStockLevels] = useState({});
  const [visibility, setVisibility] = useState({});

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);

    const initialStockLevels = {};
    const initialVisibility = {};

    storedItems.forEach(item => {
      initialStockLevels[item.stockCode] = '';

      const hiddenTimestamp = localStorage.getItem(`hidden_${item.stockCode}`);
      if (hiddenTimestamp) {
        const elapsedTime = Date.now() - parseInt(hiddenTimestamp, 10);
        if (elapsedTime < 30000) {
          initialVisibility[item.stockCode] = false;
          setTimeout(() => {
            setVisibility(prev => ({ ...prev, [item.stockCode]: true }));
            localStorage.removeItem(`hidden_${item.stockCode}`);
          }, 30000 - elapsedTime);
        } else {
          initialVisibility[item.stockCode] = true;
          localStorage.removeItem(`hidden_${item.stockCode}`);
        }
      } else {
        initialVisibility[item.stockCode] = true;
      }
    });

    setStockLevels(initialStockLevels);
    setVisibility(initialVisibility);
  }, []);

  const handleStockChange = (e, stockCode) => {
    setStockLevels({
      ...stockLevels,
      [stockCode]: e.target.value,
    });
  };

  const updateStock = (stockCode) => {
    const updatedItems = items.map(item => {
      if (item.stockCode === stockCode) {
        if (stockLevels[stockCode]) {
          return {
            ...item,
            currentLevel: stockLevels[stockCode],
            lastStockDate: new Date().toLocaleDateString(),
          };
        } else {
          alert('Please enter a stock level.');
        }
      }
      return item;
    });

    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));

    setVisibility(prevVisibility => ({
      ...prevVisibility,
      [stockCode]: false,
    }));

    const hideTimestamp = Date.now();
    localStorage.setItem(`hidden_${stockCode}`, hideTimestamp.toString());

    setTimeout(() => {
      setVisibility(prevVisibility => ({
        ...prevVisibility,
        [stockCode]: true,
      }));
      localStorage.removeItem(`hidden_${stockCode}`);
    }, 30000);

    window.dispatchEvent(new Event('storage'));
  };

  const sortedItems = [...items].sort((a, b) =>
    a.stockCode.localeCompare(b.stockCode)
  );

  return (
    <div className="stock-take-page">
      <h1>Stock Take</h1>
      <div className="stock-take-table">
        <div className="table-header">
          <div>Stock Code</div>
          <div>Description</div>
          <div>Supplier</div>
          <div>Unit</div>
          <div>Last Stock Date</div>
          <div>Responsible Buyer</div>
          <div>Stock Room</div>
          <div>Current Stock</div>
          <div>Action</div>
        </div>
        {sortedItems.map((item) => (
          visibility[item.stockCode] && (
            <div className="stock-take-item" key={item.stockCode}>
              <div>{item.stockCode}</div>
              <div>{item.description}</div>
              <div>{item.supplier}</div>
              <div>{item.unit}</div>
              <div>{item.lastStockDate}</div>
              <div>{item.responsibleBuyer}</div>
              <div>{item.stockRoom}</div>
              <div>
                <input
                  type="number"
                  value={stockLevels[item.stockCode] || ''}
                  onChange={(e) => handleStockChange(e, item.stockCode)}
                  className="input-field"
                />
              </div>
              <div>
                <button className="update-button" onClick={() => updateStock(item.stockCode)}>
                  Update
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default StockTakePage;
