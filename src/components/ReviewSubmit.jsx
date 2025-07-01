import React, {useState} from 'react';

const flavorIdMapping = {
  "512MB Standard Instance": "2",
  "1GB Standard Instance": "3",
  "2GB Standard Instance": "4",
  "4GB Standard Instance": "5",
  "8GB Standard Instance": "6",
  "15GB Standard Instance": "7",
  "30GB Standard Instance": "8",
  "15 GB Compute v1": "compute1-15",
  "30 GB Compute v1": "compute1-30",
  "3.75 GB Compute v1": "compute1-4",
  "60 GB Compute v1": "compute1-60",
  "7.5 GB Compute v1": "compute1-8",
  "1 GB General Purpose v1": "general1-1",
  "2 GB General Purpose v1": "general1-2",
  "4 GB General Purpose v1": "general1-4",
  "8 GB General Purpose v1": "general1-8",
  "120 GB I/O v1": "io1-120",
  "15 GB I/O v1": "io1-15",
  "30 GB I/O v1": "io1-30",
  "60 GB I/O v1": "io1-60",
  "90 GB I/O v1": "io1-90",
  "120 GB Memory v1": "memory1-120",
  "15 GB Memory v1": "memory1-15",
  "240 GB Memory v1": "memory1-240",
  "30 GB Memory v1": "memory1-30",
  "60 GB Memory v1": "memory1-60",
  "OnMetal Compute v1": "onmetal-compute1",
  "OnMetal General Purpose v2 Large": "onmetal-general2-large",
  "OnMetal General Purpose v2 Medium": "onmetal-general2-medium",
  "OnMetal General Purpose v2 Small": "onmetal-general2-small",
  "OnMetal IO v1": "onmetal-io1",
  "OnMetal I/O v2": "onmetal-io2",
  "OnMetal Memory v1": "onmetal-memory1",
  "1 GB Performance": "performance1-1",
  "2 GB Performance": "performance1-2",
  "4 GB Performance": "performance1-4",
  "8 GB Performance": "performance1-8",
  "120 GB Performance": "performance2-120",
  "15 GB Performance": "performance2-15",
  "30 GB Performance": "performance2-30",
  "60 GB Performance": "performance2-60",
  "90 GB Performance": "performance2-90"
};

const ReviewSubmit = ({ formData, prevStep, nextStep }) => {
  // const [loading, setLoading] = useState(false); // THIS IS WHERE setLoading IS DEFINED
  // const navigate = useNavigate();
  const preparePayload = () => {
    const payload = {
      data_center: formData.dataCenter,
      region: formData.region,
      bid_price: formData.bidPrice,
      servers: formData.servers.map(server => ({
        ...server,
        flavorRef: flavorIdMapping[server.flavorRef] || server.flavorRef
      })),
      keypair: formData.keyPairOption !== 'none' ? {
        name: formData.keyPairName,
        ...(formData.keyPairOption === 'import' && { public_key: formData.publicKey })
      } : null,
      security_groups: formData.securityGroups,
      security_group_rules: formData.securityGroupRules,
      volumes: formData.volumes
    };
    
    return payload;
  };

  // const handleSubmit = () => {
  //   const payload = preparePayload();
  //   console.log('Submitting payload:', payload);
  //   // Here you would typically make an API call to your backend
  //   // fetch('/create-vm', {
  //   //   method: 'POST',
  //   //   headers: { 'Content-Type': 'application/json' },
  //   //   body: JSON.stringify(payload)
  //   // })
  //   // .then(response => response.json())
  //   // .then(data => console.log('Success:', data))
  //   // .catch(error => console.error('Error:', error));
    
  //   alert('VM creation request submitted! Check console for payload details.');
  // };

  // const handleSubmit = () => {
  //   const payload = preparePayload();
  //   console.log('Submitting payload:', payload);
    
  //   // Simulate API call
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     // Redirect to dashboard after submission
  //     navigate('/dashboard', { state: { vmData: payload } });
  //   }, 1500);
  // };

  const handleSubmit = async () => {
  const payload = preparePayload();
  console.log('Payload:', payload); // Verify in console
  
  // setLoading(true);
  
  try {
    // const response = await fetch('/api/create-vm', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });
    
    // if (!response.ok) throw new Error('Failed to create VM');
    
    // const result = await response.json();
    // console.log('Creation successful:', result);
    await new Promise(resolve => setTimeout(resolve, 5000));
        alert('Creation successful');
        await new Promise(resolve => setTimeout(resolve, 5000))
        nextStep()
    // Redirect to dashboard with the created data
    // navigate('/dashboard', { 
    //   state: { 
    //     vmData: payload,
    //     success: true,
    //     message: 'VMs created successfully!' 
    //   } 
    // });
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to create VM: ' + error.message);
  } finally {
    // Optionally reset form or handle post-submission logic
    // setLoading(false);
  }
};

  return (
    <div className="form-container">
      <h2>Review and Submit</h2>
      <div className="review-section">
        <h3>VM Configuration</h3>
        <p><strong>Data Center:</strong> {formData.dataCenter}</p>
        <p><strong>Region:</strong> {formData.region}</p>
        <p><strong>Flavor:</strong> {formData.flavor}</p>
        <p><strong>Quantity:</strong> {formData.quantity}</p>
        <p><strong>Bid Price per VM:</strong> ${formData.bidPrice.toFixed(2)}</p>
        
        <h3>Servers</h3>
        <ul>
          {formData.servers.map((server, index) => (
            <li key={index}>
              <strong>{server.name}</strong>: {server.flavorRef} {server.key_name && `(Key: ${server.key_name})`}
            </li>
          ))}
        </ul>
        
        {formData.keyPairOption !== 'none' && (
          <>
            <h3>SSH Key Pair</h3>
            <p><strong>Option:</strong> {formData.keyPairOption === 'default' ? 'Create default' : 'Import own'}</p>
            <p><strong>Name:</strong> {formData.keyPairName}</p>
            {formData.keyPairOption === 'import' && (
              <p><strong>Public Key:</strong> {formData.publicKey.substring(0, 30)}...</p>
            )}
          </>
        )}
        
        {formData.securityGroups.length > 0 && (
          <>
            <h3>Security Groups</h3>
            <ul>
              {formData.securityGroups.map((group, index) => (
                <li key={index}>
                  <strong>{group.name}</strong>: {group.description}
                </li>
              ))}
            </ul>
            
            <h4>Security Group Rules</h4>
            <ul>
              {formData.securityGroupRules.map((rule, index) => (
                <li key={index}>
                  {rule.direction} {rule.protocol} {rule.port_range_min}-{rule.port_range_max}
                </li>
              ))}
            </ul>
          </>
        )}
        
        {formData.volumes.length > 0 && (
          <>
            <h3>Volumes</h3>
            <ul>
              {formData.volumes.map((volume, index) => (
                <li key={index}>
                  <strong>{volume.display_name}</strong>: {volume.display_description} - 
                  {volume.size}GB ({volume.volume_type})
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      
      <div className="form-navigation">
        <button onClick={prevStep} className="btn-prev">Back</button>
        <button onClick={handleSubmit} className="btn-submit">Submit VM Request</button>
      </div>
    </div>
  );
};

export default ReviewSubmit;