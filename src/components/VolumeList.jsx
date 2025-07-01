import React from 'react';

const VolumeList = ({ volumes, onDelete }) => {
  return (
    <div className="resource-list">
      <h2>Volumes</h2>
      {volumes.length === 0 ? (
        <p>No volumes found.</p>
      ) : (
        <table className="resource-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Size (GB)</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volumes.map((vol, index) => (
              <tr key={index}>
                <td>{vol.display_name}</td>
                <td>{vol.display_description}</td>
                <td>{vol.size}</td>
                <td>{vol.volume_type}</td>
                <td>
                  <button 
                    onClick={() => onDelete(vol.display_name)} 
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VolumeList;