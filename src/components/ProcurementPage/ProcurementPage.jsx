import React from 'react';
import ProcurementList from '../ProcurementList/ProcurementList';
import './ProcurementPage.css';

function ProcurementPage() {
  return (
    <div className="procurement-page">
      <h1>Procurement Page</h1>
      <ProcurementList />
    </div>
  );
}

export default ProcurementPage;
