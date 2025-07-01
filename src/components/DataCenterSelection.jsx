import React from 'react';

const DataCenterSelection = ({ formData, updateFormData, nextStep, prevStep }) => {
  const dataCenters = [
    { id: 'gen1', name: 'Gen 1 - OSPC' },
    { id: 'gen2', name: 'Gen 2 - Flex' }
  ];

  const handleChange = (e) => {
    updateFormData('dataCenter', e.target.value);
  };

  return (
    <div className="form-container">
      <h2>Select Data Center</h2>
      <div className="form-group">
        {dataCenters.map((dc) => (
          <div key={dc.id} className="radio-option">
            <input
              type="radio"
              id={dc.id}
              name="dataCenter"
              value={dc.name}
              checked={formData.dataCenter === dc.name}
              onChange={handleChange}
            />
            <label htmlFor={dc.id}>{dc.name}</label>
          </div>
        ))}
      </div>
      <div className="form-navigation">
        <button onClick={prevStep} className="btn-prev">Back</button>
        <button onClick={nextStep} disabled={!formData.dataCenter} className="btn-next">Next</button>
      </div>
    </div>
  );
};

export default DataCenterSelection;