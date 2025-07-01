import React, { useState } from 'react';

const KeyPair = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [keyPairOption, setKeyPairOption] = useState(formData.keyPairOption);
  const [keyPairName, setKeyPairName] = useState(formData.keyPairName);
  const [publicKey, setPublicKey] = useState(formData.publicKey);

  const handleOptionChange = (e) => {
    setKeyPairOption(e.target.value);
  };

  const handleNameChange = (e) => {
    setKeyPairName(e.target.value);
  };

  const handlePublicKeyChange = (e) => {
    setPublicKey(e.target.value);
  };

  const handleSubmit = () => {
    updateFormData('keyPairOption', keyPairOption);
    updateFormData('keyPairName', keyPairName);
    updateFormData('publicKey', publicKey);
    nextStep();
  };

  return (
    <div className="form-container">
      <h2>SSH Key Pair</h2>
      <div className="form-group">
        <label>Do you want to use an SSH key pair?</label>
        <div className="radio-option">
          <input
            type="radio"
            id="keypair-none"
            name="keypair"
            value="none"
            checked={keyPairOption === 'none'}
            onChange={handleOptionChange}
          />
          <label htmlFor="keypair-none">No</label>
        </div>
        <div className="radio-option">
          <input
            type="radio"
            id="keypair-default"
            name="keypair"
            value="default"
            checked={keyPairOption === 'default'}
            onChange={handleOptionChange}
          />
          <label htmlFor="keypair-default">Yes, create default key pair</label>
        </div>
        <div className="radio-option">
          <input
            type="radio"
            id="keypair-import"
            name="keypair"
            value="import"
            checked={keyPairOption === 'import'}
            onChange={handleOptionChange}
          />
          <label htmlFor="keypair-import">Yes, import my own public key</label>
        </div>
      </div>

      {(keyPairOption === 'default' || keyPairOption === 'import') && (
        <div className="form-group">
          <label>
            Key Pair Name:
            <input
              type="text"
              value={keyPairName}
              onChange={handleNameChange}
              className="form-input"
              placeholder="Enter key pair name"
            />
          </label>
        </div>
      )}

      {keyPairOption === 'import' && (
        <div className="form-group">
          <label>
            Public Key:
            <textarea
              value={publicKey}
              onChange={handlePublicKeyChange}
              className="form-textarea"
              placeholder="Paste your public key here (ssh-rsa AAA...)"
              rows="5"
            />
          </label>
        </div>
      )}

      <div className="form-navigation">
        <button onClick={prevStep} className="btn-prev">Back</button>
        <button onClick={handleSubmit} className="btn-next">Next</button>
      </div>
    </div>
  );
};

export default KeyPair;