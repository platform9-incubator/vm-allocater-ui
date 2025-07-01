import React from 'react';

const flavorGroups = {
  // "Standard Instances": [
  //   "512MB Standard Instance",
  //   "1GB Standard Instance",
  //   "2GB Standard Instance",
  //   "4GB Standard Instance",
  //   "8GB Standard Instance",
  //   "15GB Standard Instance",
  //   "30GB Standard Instance"
  // ],
  "Compute v1 Flavors": [
    "15 GB Compute v1",
    // "30 GB Compute v1",
    "3.75 GB Compute v1",
    // "60 GB Compute v1",
    "7.5 GB Compute v1"
  ],
  "General Purpose v1 Flavors": [
    "1 GB General Purpose v1",
    "2 GB General Purpose v1",
    "4 GB General Purpose v1",
    // "8 GB General Purpose v1"
  ],
  // "I/O v1 Flavors": [
  //   "120 GB I/O v1",
  //   "15 GB I/O v1",
  //   "30 GB I/O v1",
  //   "60 GB I/O v1",
  //   // "90 GB I/O v1"
  // ],
  "Memory v1 Flavors": [
    // "120 GB Memory v1",
    "15 GB Memory v1",
    // "240 GB Memory v1",
    "30 GB Memory v1",
    "60 GB Memory v1"
  ],
  // "OnMetal Flavors": [
  //   "OnMetal Compute v1",
  //   "OnMetal General Purpose v2 Large",
  //   "OnMetal General Purpose v2 Medium",
  //   "OnMetal General Purpose v2 Small",
  //   "OnMetal IO v1",
  //   "OnMetal I/O v2",
  //   "OnMetal Memory v1"
  // ],
  // "Performance Flavors": [
  //   "1 GB Performance",
  //   "2 GB Performance",
  //   "4 GB Performance",
  //   "8 GB Performance",
    // "120 GB Performance",
    // "15 GB Performance",
    // "30 GB Performance",
    // "60 GB Performance",
    // "90 GB Performance"
  // ]
};

const FlavorSelection = ({ formData, updateFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    updateFormData('flavor', e.target.value);
  };

  return (
    <div className="form-container">
      <h2>Select Flavor</h2>
      <div className="form-group">
        {Object.entries(flavorGroups).map(([groupName, flavors]) => (
          <div key={groupName} className="flavor-group">
            <h3>{groupName}</h3>
            <div className="flavor-options">
              {flavors.map((flavor) => (
                <div key={flavor} className="radio-option">
                  <input
                    type="radio"
                    id={flavor}
                    name="flavor"
                    value={flavor}
                    checked={formData.flavor === flavor}
                    onChange={handleChange}
                  />
                  <label htmlFor={flavor}>{flavor}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="form-navigation">
        <button onClick={prevStep} className="btn-prev">Back</button>
        <button onClick={nextStep} disabled={!formData.flavor} className="btn-next">Next</button>
      </div>
    </div>
  );
};

export default FlavorSelection;