import React from 'react';

const KeyPairList = ({ keyPairs, onDelete }) => {
  return (
    <div className="resource-list">
      <h2>SSH Key Pairs</h2>
      {keyPairs.length === 0 ? (
        <p>No key pairs found.</p>
      ) : (
        <table className="resource-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Public Key</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {keyPairs.map((kp, index) => (
              <tr key={index}>
                <td>{kp.name}</td>
                <td className="truncate">{kp.public_key.substring(0, 30)}...</td>
                <td>
                  <button 
                    onClick={() => onDelete(kp.name)} 
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

export default KeyPairList;