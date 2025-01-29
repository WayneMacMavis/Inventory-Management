import React, { useState, useEffect } from 'react';
import { users } from '../Users/Users';
import './EditorsPage.css';
import AddItemForm from './AddItemForm';
import InventoryFilters from './InventoryFilters';
import InventoryList from '../InventoryList/InventoryList';

function EditorsPage({ items, handleChange, removeItem, addNewItem }) {
  const [newItem, setNewItem] = useState({
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
  });
  

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});

  // Dynamically generate filter options
  useEffect(() => {
    const generateOptions = (data) => {
      if (!data.length) return; // Ensure data has elements
      const options = {};
      Object.keys(data[0]).forEach((key) => {
        options[key] = [...new Set(data.map((item) => item[key]))];
      });
      setFilterOptions(options);
    };
    generateOptions(items || []);
  }, [items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addItem = () => {
    addNewItem(newItem);
    setNewItem({
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
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredItems = (items || []).filter((item) =>
    Object.keys(filters).every(
      (key) =>
        !filters[key] || item[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
    )
  );

  return (
    <div className="editors-page">
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Hide Form' : 'Show Form'}
      </button>

      {isFormVisible && (
        <AddItemForm
          newItem={newItem}
          users={users}
          handleInputChange={handleInputChange}
          addItem={addItem}
        />
      )}

      <div className="inventory-list-container">
        <InventoryFilters
          newItem={newItem}
          filters={filters}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
        />
        <InventoryList filteredItems={filteredItems} removeItem={removeItem} />
      </div>
    </div>
  );
}

export default EditorsPage;
