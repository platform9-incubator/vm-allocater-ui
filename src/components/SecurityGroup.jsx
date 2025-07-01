// import React, { useState } from 'react';

// const SecurityGroup = ({ formData, updateFormData, nextStep, prevStep }) => {
//   const [useSecurityGroup, setUseSecurityGroup] = useState(formData.securityGroups.length > 0);
//   const [securityGroups, setSecurityGroups] = useState(formData.securityGroups);
//   const [securityGroupRules, setSecurityGroupRules] = useState(formData.securityGroupRules);
//   const [newGroupName, setNewGroupName] = useState('');
//   const [newGroupDescription, setNewGroupDescription] = useState('');
//  const [newRule, setNewRule] = useState({
//   direction: 'ingress',
//   protocol: 'tcp',
//   port_range_min: '',
//   port_range_max: '',
//   ethertype: 'IPv4',
//   remote_ip_prefix: '',
//   security_group_id: securityGroups.length > 0 ? securityGroups[0].name : ''
// });

//   const handleSecurityGroupToggle = (e) => {
//     setUseSecurityGroup(e.target.checked);
//   };

//   const handleAddGroup = () => {
//     if (newGroupName) {
//       const newGroup = {
//         name: newGroupName,
//         description: newGroupDescription
//       };
//       setSecurityGroups([...securityGroups, newGroup]);
//       setNewGroupName('');
//       setNewGroupDescription('');
//     }
//   };

//   const handleRemoveGroup = (index) => {
//     const updatedGroups = [...securityGroups];
//     updatedGroups.splice(index, 1);
//     setSecurityGroups(updatedGroups);
//   };

//   const handleAddRule = () => {
//     if (newRule.port_range_min && securityGroups.length > 0) {
//       const ruleToAdd = {
//         ...newRule,
//         security_group_id: securityGroups[securityGroups.length - 1].name, // Using name as ID for simplicity
//         remote_group_id: null
//       };
//       setSecurityGroupRules([...securityGroupRules, ruleToAdd]);
//       setNewRule({
//         direction: 'ingress',
//         protocol: 'TCP',
//         port_range_min: '',
//         port_range_max: '',
//         ethertype: 'IPv4'
//       });
//     }
//   };

//   const handleRemoveRule = (index) => {
//     const updatedRules = [...securityGroupRules];
//     updatedRules.splice(index, 1);
//     setSecurityGroupRules(updatedRules);
//   };

//   const handleSubmit = () => {
//     updateFormData('securityGroups', useSecurityGroup ? securityGroups : []);
//     updateFormData('securityGroupRules', useSecurityGroup ? securityGroupRules : []);
//     nextStep();
//   };

//   return (
//     <div className="form-container">
//       <h2>Security Groups</h2>
//       <div className="form-group">
//         <label className="checkbox-option">
//           <input
//             type="checkbox"
//             checked={useSecurityGroup}
//             onChange={handleSecurityGroupToggle}
//           />
//           Add security groups and rules
//         </label>
//       </div>

//       {useSecurityGroup && (
//         <>
//           <div className="form-group">
//             <h3>Security Groups</h3>
//             <div className="form-row">
//               <input
//                 type="text"
//                 value={newGroupName}
//                 onChange={(e) => setNewGroupName(e.target.value)}
//                 placeholder="Group name"
//                 className="form-input"
//               />
//               <input
//                 type="text"
//                 value={newGroupDescription}
//                 onChange={(e) => setNewGroupDescription(e.target.value)}
//                 placeholder="Description"
//                 className="form-input"
//               />
//               <button onClick={handleAddGroup} className="btn-add">Add Group</button>
//             </div>
//             {securityGroups.length > 0 && (
//               <div className="items-list">
//                 {securityGroups.map((group, index) => (
//                   <div key={index} className="item">
//                     <span><strong>{group.name}</strong>: {group.description}</span>
//                     <button onClick={() => handleRemoveGroup(index)} className="btn-remove">Remove</button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {securityGroups.length > 0 && (
//             <div className="form-group">
//               <h3>Security Group Rules</h3>
//               <div className="form-row">
//                 <select
//                   value={newRule.direction}
//                   onChange={(e) => setNewRule({...newRule, direction: e.target.value})}
//                   className="form-select"
//                 >
//                   <option value="ingress">Ingress</option>
//                   <option value="egress">Egress</option>
//                 </select>
//                 <select
//                   value={newRule.protocol}
//                   onChange={(e) => setNewRule({...newRule, protocol: e.target.value})}
//                   className="form-select"
//                 >
//                   <option value="TCP">TCP</option>
//                   <option value="UDP">UDP</option>
//                   <option value="ICMP">ICMP</option>
//                 </select>
//                 <input
//                   type="number"
//                   value={newRule.port_range_min}
//                   onChange={(e) => setNewRule({...newRule, port_range_min: e.target.value})}
//                   placeholder="Min port"
//                   className="form-input"
//                 />
//                 <input
//                   type="number"
//                   value={newRule.port_range_max}
//                   onChange={(e) => setNewRule({...newRule, port_range_max: e.target.value})}
//                   placeholder="Max port"
//                   className="form-input"
//                 />
//                 <button onClick={handleAddRule} className="btn-add">Add Rule</button>
//               </div>
//               {securityGroupRules.length > 0 && (
//                 <div className="items-list">
//                   {securityGroupRules.map((rule, index) => (
//                     <div key={index} className="item">
//                       <span>
//                         {rule.direction} {rule.protocol} {rule.port_range_min}-{rule.port_range_max}
//                       </span>
//                       <button onClick={() => handleRemoveRule(index)} className="btn-remove">Remove</button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}

//       <div className="form-navigation">
//         <button onClick={prevStep} className="btn-prev">Back</button>
//         <button onClick={handleSubmit} className="btn-next">Next</button>
//       </div>
//     </div>
//   );
// };

// export default SecurityGroup;

import React, { useState } from 'react';

const SecurityGroup = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [useSecurityGroup, setUseSecurityGroup] = useState(formData.securityGroups.length > 0);
  const [securityGroups, setSecurityGroups] = useState(formData.securityGroups);
  const [securityGroupRules, setSecurityGroupRules] = useState(formData.securityGroupRules);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newRule, setNewRule] = useState({
    direction: 'ingress',
    protocol: 'tcp',
    port_range_min: '',
    port_range_max: '',
    ethertype: 'IPv4',
    remote_ip_prefix: '',
    security_group_id: securityGroups.length > 0 ? securityGroups[0].name : ''
  });

  const handleSecurityGroupToggle = (e) => {
    setUseSecurityGroup(e.target.checked);
  };

  const handleAddGroup = () => {
    if (newGroupName) {
      const newGroup = {
        name: newGroupName,
        description: newGroupDescription
      };
      setSecurityGroups([...securityGroups, newGroup]);
      setNewGroupName('');
      setNewGroupDescription('');
      // Update the security_group_id in newRule if it's the first group
      if (securityGroups.length === 0) {
        setNewRule(prev => ({ ...prev, security_group_id: newGroup.name }));
      }
    }
  };

  const handleRemoveGroup = (index) => {
    const updatedGroups = [...securityGroups];
    updatedGroups.splice(index, 1);
    setSecurityGroups(updatedGroups);
    // Update rules if we're removing the selected group
    if (newRule.security_group_id === securityGroups[index].name) {
      setNewRule(prev => ({
        ...prev,
        security_group_id: updatedGroups.length > 0 ? updatedGroups[0].name : ''
      }));
    }
  };

  const handleAddRule = () => {
    if ((newRule.protocol === '' || newRule.port_range_min) && securityGroups.length > 0) {
      const ruleToAdd = {
        ...newRule,
        remote_group_id: null
      };
      setSecurityGroupRules([...securityGroupRules, ruleToAdd]);
      setNewRule({
        direction: 'ingress',
        protocol: 'tcp',
        port_range_min: '',
        port_range_max: '',
        ethertype: 'IPv4',
        remote_ip_prefix: '',
        security_group_id: securityGroups[0].name
      });
    }
  };

  const handleRemoveRule = (index) => {
    const updatedRules = [...securityGroupRules];
    updatedRules.splice(index, 1);
    setSecurityGroupRules(updatedRules);
  };

  const handleSubmit = () => {
    updateFormData('securityGroups', useSecurityGroup ? securityGroups : []);
    updateFormData('securityGroupRules', useSecurityGroup ? securityGroupRules : []);
    nextStep();
  };

  return (
    <div className="form-container">
      <h2>Security Groups</h2>
      <div className="form-group">
        <label className="checkbox-option">
          <input
            type="checkbox"
            checked={useSecurityGroup}
            onChange={handleSecurityGroupToggle}
          />
          Add security groups and rules
        </label>
      </div>

      {useSecurityGroup && (
        <>
          <div className="form-group">
            <h3>Security Groups</h3>
            <div className="form-row">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Group name"
                className="form-input"
              />
              <input
                type="text"
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                placeholder="Description"
                className="form-input"
              />
              <button onClick={handleAddGroup} className="btn-add">Add Group</button>
            </div>
            {securityGroups.length > 0 && (
              <div className="items-list">
                {securityGroups.map((group, index) => (
                  <div key={index} className="item">
                    <span><strong>{group.name}</strong>: {group.description}</span>
                    <button onClick={() => handleRemoveGroup(index)} className="btn-remove">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {securityGroups.length > 0 && (
            <div className="form-group">
              <h3>Security Group Rules</h3>
              <div className="form-row">
                <select
                  value={newRule.direction}
                  onChange={(e) => setNewRule({...newRule, direction: e.target.value})}
                  className="form-select"
                >
                  <option value="ingress">Ingress</option>
                  <option value="egress">Egress</option>
                </select>
                
                <select
                  value={newRule.protocol}
                  onChange={(e) => setNewRule({...newRule, protocol: e.target.value})}
                  className="form-select"
                >
                  <option value="tcp">TCP</option>
                  <option value="udp">UDP</option>
                  <option value="icmp">ICMP</option>
                  <option value="any">Any</option>
                </select>

                {newRule.protocol !== '' && (
                  <>
                    <input
                      type="number"
                      value={newRule.port_range_min}
                      onChange={(e) => setNewRule({...newRule, port_range_min: e.target.value})}
                      placeholder="Min port"
                      className="form-input"
                    />
                    <input
                      type="number"
                      value={newRule.port_range_max}
                      onChange={(e) => setNewRule({...newRule, port_range_max: e.target.value})}
                      placeholder="Max port"
                      className="form-input"
                    />
                  </>
                )}

                <input
                  type="text"
                  value={newRule.remote_ip_prefix}
                  onChange={(e) => setNewRule({...newRule, remote_ip_prefix: e.target.value})}
                  placeholder="Remote IP Prefix"
                  className="form-input"
                />

                <select
                  value={newRule.security_group_id}
                  onChange={(e) => setNewRule({...newRule, security_group_id: e.target.value})}
                  className="form-select"
                >
                  {securityGroups.map((group) => (
                    <option key={group.name} value={group.name}>{group.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-row">
                <button onClick={handleAddRule} className="btn-add">Add Rule</button>
              </div>

              {securityGroupRules.length > 0 && (
                <div className="items-list">
                  {securityGroupRules.map((rule, index) => (
                    <div key={index} className="item">
                      <div>
                        <strong>Group:</strong> {rule.security_group_id} | 
                        <strong>Direction:</strong> {rule.direction} | 
                        <strong>Protocol:</strong> {rule.protocol}
                      </div>
                      {rule.protocol !== '' && (
                        <div>
                          <strong>Ports:</strong> {rule.port_range_min}-{rule.port_range_max}
                        </div>
                      )}
                      {rule.remote_ip_prefix && (
                        <div>
                          <strong>Remote IP:</strong> {rule.remote_ip_prefix}
                        </div>
                      )}
                      <button onClick={() => handleRemoveRule(index)} className="btn-remove">Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <div className="form-navigation">
        <button onClick={prevStep} className="btn-prev">Back</button>
        <button onClick={handleSubmit} className="btn-next">Next</button>
      </div>
    </div>
  );
};

export default SecurityGroup;