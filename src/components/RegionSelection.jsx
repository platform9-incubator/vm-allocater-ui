import React from 'react';

const RegionSelection = ({ formData, updateFormData, nextStep, prevStep }) => {
  const regions = ['IAD', 'DFW', 'HKG', 'SYD', 'ORD'];

  const handleChange = (e) => {
    updateFormData('region', e.target.value);
  };

  return (
    <div className="form-container">
      <h2>Select Region</h2>
      <div className="form-group">
        <select value={formData.region} onChange={handleChange} className="form-select">
          <option value="">Select a region</option>
          {regions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
      <div className="form-navigation">
        <button onClick={prevStep} className="btn-prev">Back</button>
        <button onClick={nextStep} disabled={!formData.region} className="btn-next">Next</button>
      </div>
    </div>
  );
};

export default RegionSelection;