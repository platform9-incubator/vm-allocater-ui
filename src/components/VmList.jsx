import React from 'react';

const VmList = ({ vms, onDelete }) => {
  return (
    <div className="resource-list">
      <h2>Virtual Machines</h2>
      {vms.length === 0 ? (
        <p>No virtual machines found.</p>
      ) : (
        <table className="resource-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Flavor</th>
              <th>Status</th>
              <th>Bid Price</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vms.map(vm => (
              <tr key={vm.id}>
                <td>{vm.name}</td>
                <td>{vm.flavorRef || "general"}</td>
                <td>
                  <span className={`status-badge ${vm.status}`}>
                    {vm.status}
                  </span>
                </td>
                <td>${vm.metadata.bidPrice || "0.99"}</td>
                <td>{"2025-07-01T02:22:04.676555"}</td>
                <td>
                  <button 
                    onClick={() => onDelete(vm.id)} 
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

export default VmList;