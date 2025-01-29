import React, { useState } from 'react';
import './InventoryForm.css';

function InventoryForm({ addItem }) {
  const initialFormState = {
    stockCode: '',
    description: '',
    stockLevelRequired: '',
    responsibleCounter: '',
    responsibleBuyer: '',
    currentLevel: '',
    unit: '',
    orderQuantity: '',
    purchaseUnit: '',
    lastStockDate: '',
    stockRoom: '',
    supplier: '',
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(formState);
    setFormState(initialFormState);
  };

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="stock Code"
        placeholder="Stock Code"
        value={formState.stockCode}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formState.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="stock Level Required"
        placeholder="Stock Level Required"
        value={formState.stockLevelRequired}
        onChange={handleChange}
      />
      <input
        type="text"
        name="responsible Counter"
        placeholder="Responsible Counter"
        value={formState.responsibleCounter}
        onChange={handleChange}
      />
      <input
        type="text"
        name="responsible Buyer"
        placeholder="Responsible Buyer"
        value={formState.responsibleBuyer}
        onChange={handleChange}
      />
      <input
        type="number"
        name="current Level"
        placeholder="Current Level"
        value={formState.currentLevel}
        onChange={handleChange}
      />
      <input
        type="text"
        name="unit"
        placeholder="Unit"
        value={formState.unit}
        onChange={handleChange}
      />
      <input
        type="number"
        name="order Quantity"
        placeholder="Order Quantity"
        value={formState.orderQuantity}
        onChange={handleChange}
      />
      <input
        type="text"
        name="purchase Unit"
        placeholder="Purchase Unit"
        value={formState.purchaseUnit}
        onChange={handleChange}
      />
      <input
        type="date"
        name="last Stock Date"
        value={formState.lastStockDate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="stock Room"
        placeholder="Stock Room"
        value={formState.stockRoom}
        onChange={handleChange}
      />
      <input
        type="text"
        name="supplier"
        placeholder="Supplier"
        value={formState.supplier}
        onChange={handleChange}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default InventoryForm;
