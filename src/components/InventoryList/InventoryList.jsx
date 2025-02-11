import React, { useState } from 'react';
import './InventoryList.css';

function InventoryList({ filteredItems, removeItem, onUpdate }) {
  // State for inline editing
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  
  // State for the speech bubble popover menu
  const [openMenuId, setOpenMenuId] = useState(null);

  // Define the order of fields to display
  const fieldsOrder = [
    'stockCode',
    'description',
    'stockLevelRequired',
    'responsibleCounter',
    'responsibleBuyer',
    'currentLevel',
    'unit',
    'orderQuantity',
    'purchaseUnit',
    'lastStockDate',
    'stockRoom',
    'supplier'
  ];

  // Start inline editing by setting editing state and pre-filling editData
  const startEditing = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

  // Update local inline-edit state as input values change
  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  // Save the changes by calling the parent's onUpdate function
  const saveChanges = () => {
    onUpdate(editData);
    setEditingId(null);
    setEditData({});
  };

  // Cancel inline editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  // Toggle the speech bubble popover menu for a given row
  const toggleMenu = (itemId) => {
    setOpenMenuId(openMenuId === itemId ? null : itemId);
  };

  return (
    <>
      {filteredItems.map((item) => (
        <div className="inventory-list row" key={item.id}>
          {fieldsOrder.map((field) => (
            <div key={field} className="field-cell">
              {editingId === item.id ? (
                <input
                  type="text"
                  name={field}
                  value={editData[field] || ''}
                  onChange={(e) => handleInputChange(e, field)}
                />
              ) : (
                item[field]
              )}
            </div>
          ))}
          <div className="actions">
            {editingId === item.id ? (
              <>
                <button className="action-button save-button" onClick={saveChanges}>Save</button>
                <button className="action-button cancel-button" onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <div className="menu-container">
                <button
                  className="menu-button"
                  onClick={() => toggleMenu(item.id)}
                >
                  ⋮
                </button>
                {openMenuId === item.id && (
                  <div className="popover">
                    <button
                    className="popover-button edit-button"
                      onClick={() => {
                        startEditing(item);
                        setOpenMenuId(null);
                      }}
                    >
                      Edit
                    </button>
                    <button
                    className="popover-button delete-button"
                      onClick={() => {
                        removeItem(item.id);
                        setOpenMenuId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default InventoryList;
