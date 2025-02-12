import React, { useState } from 'react';
import './InventoryList.css';

function InventoryList({ filteredItems, removeItem, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);

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

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  const saveChanges = () => {
    onUpdate(editData);
    setEditingId(null);
    setEditData({});
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

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
            <div className="menu-container">
              <button
                className="menu-button"
                onClick={() => toggleMenu(item.id)}
              >
                ⋮
              </button>
              {openMenuId === item.id && (
                <div className="popover">
                  {editingId === item.id ? (
                    <>
                      <button
                        className="popover-button save-button"
                        onClick={() => {
                          saveChanges();
                          setOpenMenuId(null);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="popover-button cancel-button"
                        onClick={() => {
                          cancelEditing();
                          setOpenMenuId(null);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default InventoryList;
