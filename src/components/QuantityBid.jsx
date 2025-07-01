import React from 'react';

const QuantityBid = ({ formData, updateFormData, nextStep, prevStep }) => {
  const handleQuantityChange = (e) => {
    updateFormData('quantity', parseInt(e.target.value) || 1);
  };

  const handleBidChange = (e) => {
    updateFormData('bidPrice', parseFloat(e.target.value) || 0);
  };

  return (
    <div className="form-container">
      <h2>Quantity & Bid Price</h2>
      <div className="form-group">
        <label>
          Number of VMs:
          <input
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleQuantityChange}
            className="form-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Bid Price per VM:
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.bidPrice}
            onChange={handleBidChange}
            className="form-input"
          />
        </label>
      </div>
      <div className="form-navigation">
        <button onClick={prevStep} className="btn-prev">Back</button>
        <button onClick={nextStep} className="btn-next">Next</button>
      </div>
    </div>
  );
};

export default QuantityBid;