import React from 'react';
import './InventoryList.css';

function InventoryList({ filteredItems, removeItem }) {
  // Define the order of fields you want to display
  const fieldsOrder = [
    'stockCode',
    'description',
    'stockLevelRequired',
    'responsibleCounter',
    'responsibleBuyer',
    'currentLevel',
    'unit',
    'orderQuantity',
    'purchaseUnit',
    'lastStockDate',
    'stockRoom',
    'supplier'
  ];

  return (
    <>
      {filteredItems.map((item, index) => (
        <div className="inventory-list row" key={index}>
          {fieldsOrder.map((field) => (
            <div key={field}>{item[field]}</div>
          ))}
          <div className="delete-btn" onClick={() => removeItem(item.id)}>
            X
          </div>
        </div>
      ))}
    </>
  );
}

export default InventoryList;
