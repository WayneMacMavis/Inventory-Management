import React from 'react';
import './AddItemForm.css';

function AddItemForm({ newItem, users, handleInputChange, addItem }) {
  return (
    <div className="add-item-form">
      {Object.keys(newItem).map((key) => (
        <div key={key}>
          {key === 'responsibleCounter' ? (
            <select name={key} value={newItem[key]} onChange={handleInputChange}>
              <option value="">Select {key}</option>
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={key === 'lastStockDate' ? 'date' : 'text'}
              name={key}
              value={newItem[key]}
              onChange={handleInputChange}
              placeholder={key}
            />
          )}
        </div>
      ))}
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default AddItemForm;
