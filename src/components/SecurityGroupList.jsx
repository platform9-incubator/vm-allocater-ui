import React from 'react';

const SecurityGroupList = ({ securityGroups, securityGroupRules, onDelete }) => {
  return (
    <div className="resource-list">
      <h2>Security Groups</h2>
      {securityGroups.length === 0 ? (
        <p>No security groups found.</p>
      ) : (
        <div>
          <table className="resource-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Rules Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {securityGroups.map((sg, index) => {
                const ruleCount = securityGroupRules.filter(
                  rule => rule.security_group_id === sg.name
                ).length;
                return (
                  <tr key={index}>
                    <td>{sg.name}</td>
                    <td>{sg.description}</td>
                    <td>{ruleCount}</td>
                    <td>
                      <button 
                        onClick={() => onDelete(sg.name)} 
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h3>Security Group Rules</h3>
          <table className="resource-table">
            <thead>
              <tr>
                <th>Group</th>
                <th>Direction</th>
                <th>Protocol</th>
                <th>Port Range</th>
              </tr>
            </thead>
            <tbody>
            {securityGroupRules.map((rule, index) => (
              <div key={index} className="resource-card">
                <h4>Rule #{index + 1}</h4>
                <div className="rule-details">
                  <p><strong>Group:</strong> {rule.security_group_id}</p>
                  <p><strong>Direction:</strong> {rule.direction}</p>
                  <p><strong>Protocol:</strong> {rule.protocol}</p>
                  {rule.port_range_min && (
                    <p><strong>Ports:</strong> {rule.port_range_min}-{rule.port_range_max}</p>
                  )}
                  {rule.remote_ip_prefix && (
                    <p><strong>Remote IP:</strong> {rule.remote_ip_prefix}</p>
                  )}
                  {rule.ethertype && (
                    <p><strong>Ethertype:</strong> {rule.ethertype}</p>
                  )}
                </div>
              </div>
            ))}
             
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SecurityGroupList;