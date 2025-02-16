import React from 'react';
import './PaginationControls.css';

function PaginationControls({ itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, totalItems }) {
  const options = [5, 10, 15, 20, 'all'];

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value;
    if (value === 'all') {
      setItemsPerPage(0); // 0 indicates "show all"
      setCurrentPage(1);
    } else {
      setItemsPerPage(Number(value));
      setCurrentPage(1);
    }
  };

  // Calculate total pages (if itemsPerPage is 0, treat as one page)
  const totalPages = itemsPerPage > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination-controls">
      <div className="items-per-page">
        <span>Items per page: </span>
        <select value={itemsPerPage === 0 ? 'all' : itemsPerPage} onChange={handleItemsPerPageChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option === 'all' ? 'All' : option}
            </option>
          ))}
        </select>
      </div>
      <div className="page-navigation">
        <button className="nav-btn" onClick={handlePrev} disabled={currentPage === 1}>
          &#8592; Prev
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button className="nav-btn" onClick={handleNext} disabled={currentPage === totalPages}>
          Next &#8594;
        </button>
      </div>
    </div>
  );
}

export default PaginationControls;
