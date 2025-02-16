import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './InventoryList.css';

// A reusable Popover component that renders into document.body
function Popover({ children, position, onClose }) {
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      className="popover"
      ref={popoverRef}
      style={{ top: position.top, left: position.left }}
    >
      <div className="popover-content">
        {children}
      </div>
    </div>,
    document.body
  );
}

function InventoryList({ filteredItems, removeItem, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);
  const [popoverPos, setPopoverPos] = useState(null);

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
    'lastStockDate', // This field will be read-only
    'stockRoom',
    'supplier'
  ];

  // Start inline editing for a row
  const startEditing = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

  // Handle input changes when editing
  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  // Save changes and exit editing mode
  const saveChanges = () => {
    onUpdate(editData);
    setEditingId(null);
    setEditData({});
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  // Toggle the popover menu. We calculate the popover's position using the event's target element.
  const toggleMenu = (itemId, event) => {
    if (openMenuId === itemId) {
      setOpenMenuId(null);
      setPopoverPos(null);
    } else {
      setOpenMenuId(itemId);
      // Get the bounding rectangle of the clicked button
      const rect = event.currentTarget.getBoundingClientRect();
      // Place the popover below the button (you can adjust the offset as needed)
      setPopoverPos({ top: rect.bottom + window.scrollY + 5, left: rect.left + window.scrollX });
    }
  };

  const handleClosePopover = () => {
    setOpenMenuId(null);
    setPopoverPos(null);
  };

  return (
    <>
      {filteredItems.map((item) => (
        <div className="inventory-list row" key={item.id}>
          {fieldsOrder.map((field) => (
            <div key={field} className="field-cell">
              {editingId === item.id ? (
                field === 'lastStockDate' ? (
                  // Render lastStockDate as plain text even in editing mode.
                  item[field]
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={editData[field] || ''}
                    onChange={(e) => handleInputChange(e, field)}
                  />
                )
              ) : (
                item[field]
              )}
            </div>
          ))}
          <div className="actions">
            <button
              className="menu-button"
              onClick={(e) => toggleMenu(item.id, e)}
            >
              ⋮
            </button>
          </div>
        </div>
      ))}

      {/* Render the popover only if a menu is open */}
      {openMenuId && popoverPos && (
        <Popover position={popoverPos} onClose={handleClosePopover}>
          {editingId === openMenuId ? (
            <>
              <button
                className="popover-button save-button"
                onClick={() => { saveChanges(); handleClosePopover(); }}
              >
                Save
              </button>
              <button
                className="popover-button cancel-button"
                onClick={() => { cancelEditing(); handleClosePopover(); }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="popover-button edit-button"
                onClick={() => {
                  const item = filteredItems.find(i => i.id === openMenuId);
                  startEditing(item);
                  handleClosePopover();
                }}
              >
                Edit
              </button>
              <button
                className="popover-button delete-button"
                onClick={() => { removeItem(openMenuId); handleClosePopover(); }}
              >
                Delete
              </button>
            </>
          )}
        </Popover>
      )}
    </>
  );
}

export default InventoryList;
