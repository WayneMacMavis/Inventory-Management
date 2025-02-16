import React, { useState, useEffect } from 'react';
import { users } from '../Users/Users';
import './EditorsPage.css';
import AddItemForm from './AddItemForm';
import InventoryFilters from './InventoryFilters';
import InventoryList from '../InventoryList/InventoryList';
import SearchBar from '../EditorsPage/SearchBar';
import PaginationControls from './PaginationControls';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination state
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Listen for items from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "items"),
      (snapshot) => {
        const itemsFromFirestore = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        itemsFromFirestore.sort((a, b) => (a.stockCode || '').localeCompare(b.stockCode || ''));
        setItems(itemsFromFirestore);
      },
      (error) => {
        console.error("Error in snapshot listener:", error);
      }
    );
    return () => unsubscribe();
  }, []);
  
  // Generate filter options based on the items data
  useEffect(() => {
    const generateOptions = (data) => {
      if (!data.length) return;
      const options = {};
      Object.keys(data[0])
        .filter(key => key !== 'id')
        .forEach((key) => {
          options[key] = [...new Set(data.map((item) => item[key]).filter(Boolean))];
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
    // Optionally reset to page 1 when a filter is changed
    setCurrentPage(1);
  };
  
  // Filtering logic: each item must match all active filters exactly (ignoring case)
  // and also match the search query (partial match across any field)
  const filteredItems = (items || []).filter((item) => {
    const matchesFilters = Object.keys(filters).every((key) => {
      if (!filters[key]) return true; // No filter selected for this key
      const itemValue = item[key] ? item[key].toString().trim().toLowerCase() : '';
      const filterValue = filters[key].toString().trim().toLowerCase();
      return itemValue === filterValue;
    });
    
    const matchesSearch =
      searchQuery.trim() === '' ||
      Object.values(item).some((value) =>
        value && value.toString().toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    
    return matchesFilters && matchesSearch;
  });
  
  // Pagination: calculate the items to show on the current page
  const paginatedItems = itemsPerPage > 0
    ? filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredItems;
  
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
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <button className='show-form-btn' onClick={() => setIsFormVisible(!isFormVisible)}>
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
          filteredItems={paginatedItems} 
          removeItem={handleRemoveItem} 
          onUpdate={handleUpdateItem}
        />
        <PaginationControls 
          itemsPerPage={itemsPerPage} 
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          totalItems={filteredItems.length}
        />
      </div>
    </div>
  );
}

export default EditorsPage;
