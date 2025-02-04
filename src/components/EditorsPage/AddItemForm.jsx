import React from 'react';
import './AddItemForm.css'; // Optional: if you have specific styling for this form

function AddItemForm({ newItem, users, handleInputChange, addItem }) {
  // Options for the dropdowns
  const unitOptions = ["kg", "g", "l", "ml", "m", "each"];

  return (
    <div className="add-item-form">
      <input
        type="text"
        name="stockCode"
        value={newItem.stockCode}
        placeholder="Stock Code"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        value={newItem.description}
        placeholder="Description"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="stockLevelRequired"
        value={newItem.stockLevelRequired}
        placeholder="Stock Level Required"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="responsibleCounter"
        value={newItem.responsibleCounter}
        placeholder="Responsible Counter"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="responsibleBuyer"
        value={newItem.responsibleBuyer}
        placeholder="Responsible Buyer"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="currentLevel"
        value={newItem.currentLevel}
        placeholder="Current Level"
        onChange={handleInputChange}
      />

      {/* Dropdown for Unit */}
      <select
        name="unit"
        value={newItem.unit}
        onChange={handleInputChange}
      >
        <option value="">Select Unit</option>
        {unitOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="orderQuantity"
        value={newItem.orderQuantity}
        placeholder="Order Quantity"
        onChange={handleInputChange}
      />

      {/* Dropdown for Purchase Unit */}
      <select
        name="purchaseUnit"
        value={newItem.purchaseUnit}
        onChange={handleInputChange}
      >
        <option value="">Select Purchase Unit</option>
        {unitOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="lastStockDate"
        value={newItem.lastStockDate}
        placeholder="Last Stock Date"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="stockRoom"
        value={newItem.stockRoom}
        placeholder="Stock Room"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="supplier"
        value={newItem.supplier}
        placeholder="Supplier"
        onChange={handleInputChange}
      />

      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default AddItemForm;

