import React, { useState, useEffect } from 'react';
import './StockTakePage.css';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

function StockTakePage() {
  const [items, setItems] = useState([]);
  const [stockLevels, setStockLevels] = useState({});
  const [visibility, setVisibility] = useState({});

  useEffect(() => {
    // Subscribe to the "items" collection in Firestore.
    const unsubscribe = onSnapshot(
      collection(db, "items"),
      (snapshot) => {
        const itemsFromFirestore = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        }));

        // Sort items alphabetically by stockCode, ensuring stockCode is a string.
        itemsFromFirestore.sort((a, b) => {
          const stockCodeA = a.stockCode || ''; // Default to empty string if undefined
          const stockCodeB = b.stockCode || ''; // Default to empty string if undefined
          return stockCodeA.localeCompare(stockCodeB);
        });

        setItems(itemsFromFirestore);

        const newStockLevels = {};
        const newVisibility = {};
        itemsFromFirestore.forEach(item => {
          // Use the unique Firebase id as key
          newStockLevels[item.id] = stockLevels[item.id] || '';
          const hiddenTimestamp = localStorage.getItem(`hidden_${item.id}`);
          if (hiddenTimestamp) {
            const elapsedTime = Date.now() - parseInt(hiddenTimestamp, 10);
            if (elapsedTime < 30000) {
              newVisibility[item.id] = false;
              setTimeout(() => {
                setVisibility(prev => ({ ...prev, [item.id]: true }));
                localStorage.removeItem(`hidden_${item.id}`);
              }, 30000 - elapsedTime);
            } else {
              newVisibility[item.id] = true;
              localStorage.removeItem(`hidden_${item.id}`);
            }
          } else {
            newVisibility[item.id] = true;
          }
        });
        setStockLevels(newStockLevels);
        setVisibility(newVisibility);
      },
      (error) => {
        console.error("Error fetching items from firebase:", error);
      }
    );
    return () => unsubscribe();
  }, [stockLevels]);

  const handleStockChange = (e, itemId) => {
    setStockLevels({
      ...stockLevels,
      [itemId]: e.target.value,
    });
  };

  const updateStock = async (itemId) => {
    if (stockLevels[itemId] === '') {
      alert('Please enter a stock level.');
      return;
    }
    try {
      await updateDoc(doc(db, "items", itemId), {
        currentLevel: stockLevels[itemId],
        lastStockDate: new Date().toLocaleDateString()
      });
      console.log("Item updated successfully in firebase!");

      // Temporarily hide the updated item for 30 seconds.
      setVisibility(prev => ({
        ...prev,
        [itemId]: false
      }));
      const hideTimestamp = Date.now();
      localStorage.setItem(`hidden_${itemId}`, hideTimestamp.toString());
      setTimeout(() => {
        setVisibility(prev => ({
          ...prev,
          [itemId]: true
        }));
        localStorage.removeItem(`hidden_${itemId}`);
      }, 30000);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="stock-take-page">
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
        {items.map(item =>
          visibility[item.id] && (
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
                  value={stockLevels[item.id] || ''}
                  onChange={(e) => handleStockChange(e, item.id)}
                  className="input-field"
                />
              </div>
              <div>
                <button
                  className="update-button"
                  onClick={() => updateStock(item.id)}
                >
                  Update
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default StockTakePage;
