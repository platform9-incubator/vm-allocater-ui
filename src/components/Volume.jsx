import React, { useState } from 'react';

const Volume = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [useVolume, setUseVolume] = useState(formData.volumes.length > 0);
  const [volumes, setVolumes] = useState(formData.volumes);
  const [newVolume, setNewVolume] = useState({
    display_name: '',
    display_description: '',
    size: 75,
    volume_type: 'SATA'
  });

  const handleVolumeToggle = (e) => {
    setUseVolume(e.target.checked);
  };

  const handleAddVolume = () => {
    if (newVolume.display_name) {
      setVolumes([...volumes, {...newVolume}]);
      setNewVolume({
        display_name: '',
        display_description: '',
        size: 75,
        volume_type: 'SATA'
      });
    }
  };

  const handleRemoveVolume = (index) => {
    const updatedVolumes = [...volumes];
    updatedVolumes.splice(index, 1);
    setVolumes(updatedVolumes);
  };

  const handleSubmit = () => {
    updateFormData('volumes', useVolume ? volumes : []);
    
    // Prepare servers data based on quantity
    const servers = Array.from({ length: formData.quantity }, (_, i) => ({
      name: `vm-${i+1}`,
      imageRef: "ubuntu 20.04 lts (focal fossa) (cloud)",
      flavorRef: formData.flavor,
      key_name: formData.keyPairOption !== 'none' ? formData.keyPairName : undefined
    }));
    
    updateFormData('servers', servers);
    nextStep();
  };

  return (
    <div className="form-container">
      <h2>Volumes</h2>
      <div className="form-group">
        <label className="checkbox-option">
          <input
            type="checkbox"
            checked={useVolume}
            onChange={handleVolumeToggle}
          />
          Attach volumes to VMs
        </label>
      </div>

      {useVolume && (
        <div className="form-group">
          <h3>Add Volume</h3>
          <div className="form-row">
            <input
              type="text"
              value={newVolume.display_name}
              onChange={(e) => setNewVolume({...newVolume, display_name: e.target.value})}
              placeholder="Volume name"
              className="form-input"
            />
            <input
              type="text"
              value={newVolume.display_description}
              onChange={(e) => setNewVolume({...newVolume, display_description: e.target.value})}
              placeholder="Description"
              className="form-input"
            />
            <input
              type="number"
              min="75"
              max="250"
              value={newVolume.size}
              onChange={(e) => setNewVolume({...newVolume, size: parseInt(e.target.value) || 75})}
              placeholder="Size (GB)"
              className="form-input"
            />
            <select
              value={newVolume.volume_type}
              onChange={(e) => setNewVolume({...newVolume, volume_type: e.target.value})}
              className="form-select"
            >
              <option value="SATA">SATA</option>
              <option value="SSD">SSD</option>
            </select>
            <button onClick={handleAddVolume} className="btn-add">Add Volume</button>
          </div>
          {volumes.length > 0 && (
            <div className="items-list">
              {volumes.map((volume, index) => (
                <div key={index} className="item">
                  <span>
                    <strong>{volume.display_name}</strong>: {volume.display_description} - 
                    {volume.size}GB ({volume.volume_type})
                  </span>
                  <button onClick={() => handleRemoveVolume(index)} className="btn-remove">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="form-navigation">
        <button onClick={prevStep} className="btn-prev">Back</button>
        <button onClick={handleSubmit} className="btn-next">Next</button>
      </div>
    </div>
  );
};

export default Volume;