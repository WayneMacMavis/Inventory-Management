import React, { useState, useEffect } from 'react';
import { users } from '../Users/Users';
import './EditorsPage.css';
import AddItemForm from './AddItemForm';
import InventoryFilters from './InventoryFilters';
import InventoryList from '../InventoryList/InventoryList';

// Import Firestore functions and the db instance
import { db } from '../../firebaseConfig';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";

function EditorsPage() {
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
  const [items, setItems] = useState([]);

  // Subscribe to the "items" collection in Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemsFromFirestore = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort items alphabetically by stockCode (A-Z)
      itemsFromFirestore.sort((a, b) => a.stockCode.localeCompare(b.stockCode));
      setItems(itemsFromFirestore);
    });
    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});

  // Generate filter options based on the items data (ignoring "id")
  useEffect(() => {
    const generateOptions = (data) => {
      if (!data.length) return;
      const options = {};
      Object.keys(data[0])
        .filter(key => key !== 'id')
        .forEach((key) => {
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

  // Add a new item to Firestore
  const addItem = async () => {
    try {
      await addDoc(collection(db, "items"), newItem);
      console.log("Item added successfully to Firestore!");
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
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  // Remove an item from Firestore by its document ID
  const handleRemoveItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, "items", itemId));
      console.log("Item removed successfully!");
    } catch (error) {
      console.error("Error removing item: ", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredItems = (items || []).filter((item) =>
    Object.keys(filters).every(
      (key) =>
        !filters[key] ||
        item[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
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
        <InventoryList filteredItems={filteredItems} removeItem={handleRemoveItem} />
      </div>
    </div>
  );
}

export default EditorsPage;
