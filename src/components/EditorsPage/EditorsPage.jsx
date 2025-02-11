import React, { useState, useEffect } from 'react';
import { users } from '../Users/Users';
import './EditorsPage.css';
import AddItemForm from './AddItemForm';
import InventoryFilters from './InventoryFilters';
import InventoryList from '../InventoryList/InventoryList';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

function EditorsPage() {
  // State for new item
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
  
  // Items from Firestore
  const [items, setItems] = useState([]);
  
  // State for showing/hiding the add item form
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // State for filters
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "items"),
      (snapshot) => {
        const itemsFromFirestore = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort items alphabetically by stockCode (A-Z)
        itemsFromFirestore.sort((a, b) => a.stockCode.localeCompare(b.stockCode));
        setItems(itemsFromFirestore);
      },
      (error) => {
        console.error("Error in snapshot listener:", error);
      }
    );
    return () => unsubscribe();
  }, []);

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

  // Update item handler for inline editing.
  // Destructure the id from the updated item and update Firestore with the rest of the data.
  const handleUpdateItem = async (updatedItem) => {
    try {
      const { id, ...dataToUpdate } = updatedItem;
      await updateDoc(doc(db, "items", id), dataToUpdate);
      console.log("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item: ", error);
    }
  };

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
        <InventoryList 
          filteredItems={filteredItems} 
          removeItem={handleRemoveItem} 
          onUpdate={handleUpdateItem}
        />
      </div>
    </div>
  );
}

export default EditorsPage;
