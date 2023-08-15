import React from 'react';

import { useLocation } from 'react-router-dom';

const EditReceipt = () => {

  const location = useLocation();
  const itemId = location.state?.itemId;

  return (
    <div>
      {itemId ? (
        // Render content when itemId is available
        <h2>Editing Receipt id {itemId} Page</h2>
      ) : (
        // Render content when itemId is not available
        <div>No receipt item selected.</div>
      )}
    </div>
  );
};

export default EditReceipt;
