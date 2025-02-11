import React, { useState } from 'react';
import './EditItemForm.css';

function EditItemForm({ item, handleUpdateItem, closeEdit }) {
  const [editItem, setEditItem] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

  const handleSave = () => {
    handleUpdateItem(editItem);
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <h3>Edit Item</h3>
        <input 
          type="text" 
          name="stockCode" 
          value={editItem.stockCode} 
          onChange={handleChange} 
          placeholder="Stock Code" 
        />
        <input 
          type="text" 
          name="description" 
          value={editItem.description} 
          onChange={handleChange} 
          placeholder="Description" 
        />
        {/* Add more input fields as needed for each property */}
        <div className="edit-buttons">
          <button className="action-button save-button" onClick={handleSave}>Save</button>
          <button className="action-button cancel-button" onClick={closeEdit}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditItemForm;
