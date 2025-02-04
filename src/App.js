import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditorsPage from './components/EditorsPage/EditorsPage';
import StockTakePage from './components/StockTakePage/StockTakePage';
import ProcurementPage from './components/ProcurementPage/ProcurementPage';
import Navigation from './components/Navigation/Navigation';
import { getItemsFromLocalStorage, saveItemsToLocalStorage } from './components/Utils/LocalStorage'; // Import utilities
import './App.css';

function App() {
  const [items, setItems] = useState(() =>
    getItemsFromLocalStorage('items', [
      {
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
      },
    ])
  );

  useEffect(() => {
    saveItemsToLocalStorage('items', items);
  }, [items]);

  function handleChange(index, field, value) {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  }

  function removeItem(index) {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  }

  function addNewItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  return (
  
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <EditorsPage
                items={items}
                handleChange={handleChange}
                removeItem={removeItem}
                addNewItem={addNewItem}
              />
            }
          />
          <Route path="/stock-take" element={<StockTakePage />} />
          <Route path="/procurement" element={<ProcurementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
