import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the import path as needed
import './StockTakePage.css';

function StockTakePage() {
  const [items, setItems] = useState([]);
  const [stockInputs, setStockInputs] = useState({});

  // Load items from Firestore on mount
  useEffect(() => {
    const unsubscribe = db.collection('items')
      .orderBy('stockCode')
      .onSnapshot(snapshot => {
        const fetchedItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(fetchedItems);
      });
    return () => unsubscribe();
  }, []);

  // Handle stock level input change using a unique id (or stockCode)
  const handleStockChange = (e, id) => {
    setStockInputs({
      ...stockInputs,
      [id]: e.target.value,
    });
  };

  // Update stock level and last stock date in Firestore
  const updateStock = async (id) => {
    const inputValue = stockInputs[id];
    if (inputValue) {
      try {
        await db.collection('items').doc(id).update({
          currentLevel: inputValue,
          lastStockDate: new Date().toLocaleDateString()
        });
        // Optionally clear the input after update
        setStockInputs(prev => ({ ...prev, [id]: '' }));
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      alert('Please enter a stock level.');
    }
  };

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
        {items.map((item) => (
          <div className="stock-take-item" key={item.id}>
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
                value={stockInputs[item.id] || ''}
                onChange={(e) => handleStockChange(e, item.id)}
                className="input-field"
              />
            </div>
            <div>
              <button className="update-button" onClick={() => updateStock(item.id)}>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockTakePage;

