// import React, { useState } from 'react';
// import VmList from './VmList';
// import VolumeList from './VolumeList';
// import KeyPairList from './KeyPairList';
// import SecurityGroupList from './SecurityGroupList';
// import CreateVmButton from './CreateVmButton';

// const Dashboard = ({ data }) => {
//   const [activeTab, setActiveTab] = useState('vms');
//   const [resources, setResources] = useState(data);

//   const handleDeleteVm = async (vmId) => {
//     // Simulate API call to delete VM and all associated resources
//     const updatedVms = resources.vms.filter(vm => vm.id !== vmId);
//     const volumesToKeep = resources.volumes.filter(vol => 
//       !vol.attachments?.some(att => att.server_id === vmId)
//     );
    
//     setResources({
//       ...resources,
//       vms: updatedVms,
//       volumes: volumesToKeep
//     });
//   };

//   const handleDeleteVolume = async (volumeId) => {
//     // Simulate API call to delete volume
//     setResources({
//       ...resources,
//       volumes: resources.volumes.filter(vol => vol.display_name !== volumeId)
//     });
//   };

//   const handleDeleteKeyPair = async (keyName) => {
//     // Simulate API call to delete key pair
//     setResources({
//       ...resources,
//       keyPairs: resources.keyPairs.filter(kp => kp.name !== keyName)
//     });
//   };

//   const handleDeleteSecurityGroup = async (sgId) => {
//     // Simulate API call to delete security group
//     const updatedSGs = resources.securityGroups.filter(sg => sg.name !== sgId);
//     const updatedSGRules = resources.securityGroupRules.filter(
//       rule => !updatedSGs.some(sg => sg.name === rule.security_group_id)
//     );
    
//     setResources({
//       ...resources,
//       securityGroups: updatedSGs,
//       securityGroupRules: updatedSGRules
//     });
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1>VM on Spot Dashboard</h1>
//         <CreateVmButton />
//       </div>
      
//       <div className="dashboard-tabs">
//         <button 
//           className={`tab-btn ${activeTab === 'vms' ? 'active' : ''}`}
//           onClick={() => setActiveTab('vms')}
//         >
//           Virtual Machines
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === 'volumes' ? 'active' : ''}`}
//           onClick={() => setActiveTab('volumes')}
//         >
//           Volumes
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === 'keypairs' ? 'active' : ''}`}
//           onClick={() => setActiveTab('keypairs')}
//         >
//           Key Pairs
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
//           onClick={() => setActiveTab('security')}
//         >
//           Security Groups
//         </button>
//       </div>
      
//       <div className="dashboard-content">
//         {activeTab === 'vms' && (
//           <VmList vms={resources.vms} onDelete={handleDeleteVm} />
//         )}
//         {activeTab === 'volumes' && (
//           <VolumeList volumes={resources.volumes} onDelete={handleDeleteVolume} />
//         )}
//         {activeTab === 'keypairs' && (
//           <KeyPairList keyPairs={resources.keyPairs} onDelete={handleDeleteKeyPair} />
//         )}
//         {activeTab === 'security' && (
//           <SecurityGroupList 
//             securityGroups={resources.securityGroups} 
//             securityGroupRules={resources.securityGroupRules}
//             onDelete={handleDeleteSecurityGroup}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VmList from './VmList';
import VolumeList from './VolumeList';
import KeyPairList from './KeyPairList';
import SecurityGroupList from './SecurityGroupList';
import CreateVmButton from './CreateVmButton';

const Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('vms');
  const [resources, setResources] = useState({
    vms: [],
    volumes: [],
    keyPairs: [],
    securityGroups: [],
    securityGroupRules: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load from location state if available
    if (location.state?.vmData) {
      setResources(prev => ({
        ...prev,
        vms: location.state.vmData.servers,
        volumes: location.state.vmData.volumes,
        keyPairs: location.state.vmData.keypair ? [location.state.vmData.keypair] : [],
        securityGroups: location.state.vmData.security_groups,
        securityGroupRules: location.state.vmData.security_group_rules
      }));
    }

    // Fetch all resources from API
    const fetchResources = async () => {
      console.log('Fetching resources from API...********************************************');
      try {
        // const [vmsRes, volumesRes, keyPairsRes, sgRes, sgRulesRes] = await Promise.all([
        //   fetch('https://iad.servers.api.rackspacecloud.com/v2/1340444/servers/fd7a6dc5-768f-467f-8dd1-990aeddd4248?region=iad&cloud_environment=ospc', {
        //     headers: {
        //       'X-Auth-Token': "AAB3c97e0HnWPlMLjzGYyr6Y55tN1u_howeL_R2Ld2LKZEMVmNIrS_kYJSBcfyYotaVZ8OKwziLhqZ9Ej_rZQCzra-XMO2Bue4pr5T_PWEhsVRvh-C17Wg02QuOJ1PAlgnxSY8r8l3Gb2YxgxSYcWFsh2eVkiIrInWs",
        //       'Content-Type': 'application/json'
        //     }
        //   }).then(res => {console.log(res)}).then(finalres => {console.log(finalres); return finalres;}),
        //   // fetch('http://0.0.0.0:8000/servers/fd7a6dc5-768f-467f-8dd1-990aeddd4248?region=iad&cloud_environment=ospc').then(res => {console.log(res)}).then(finalres => {console.log(finalres); return finalres;}),
        //   fetch('http://0.0.0.0:8000/volumes/d20580f6-9cbf-48e3-b334-afa59b8b94f6?region=iad&cloud_environment=ospc').then(res => {console.log(res)}).then(finalres => {console.log(finalres); return finalres;}),
        //   fetch('http://0.0.0.0:8000/keypairs?region=iad&cloud_environment=ospc').then(res => {console.log(res)}).then(finalres => {console.log(finalres); return finalres;}),
        //   fetch('http://0.0.0.0:8000/security_groups/31ebd752-fc70-4bab-b9de-9b671101ee57?region=iad&cloud_environment=ospc').then(res => {console.log(res)}).then(finalres => {console.log(finalres); return finalres;}),
        //   fetch('http://0.0.0.0:8000/security_groups/31ebd752-fc70-4bab-b9de-9b671101ee57?region=iad&cloud_environment=ospc').then(res => {console.log(res)}).then(finalres => {console.log(finalres); return finalres;}),
        // ]);
        const [vmsRes, volumesRes, keyPairsRes, sgRes, sgRulesRes] = [
          [{
            
                "status": "ACTIVE",
                "updated": "2025-06-30T20:04:14Z",
                "hostId": "f8289455712bdff9f6f94f114967a9b05f425cf2408470dc25bfeabc",
                "addresses": {
                    "public": [
                        {
                            "version": 4,
                            "addr": "104.130.13.209"
                        },
                        {
                            "version": 6,
                            "addr": "2001:4802:7803:104:be76:4eff:fe20:2aea"
                        }
                    ],
                    "private": [
                        {
                            "version": 4,
                            "addr": "10.176.194.167"
                        }
                    ]
                },
                "links": [
                    {
                        "href": "https://iad.servers.api.rackspacecloud.com/v2/1340444/servers/fd7a6dc5-768f-467f-8dd1-990aeddd4248",
                        "rel": "self"
                    },
                    {
                        "href": "https://iad.servers.api.rackspacecloud.com/1340444/servers/fd7a6dc5-768f-467f-8dd1-990aeddd4248",
                        "rel": "bookmark"
                    }
                ],
                "key_name": "my-test-vm-1-key-pair",
                "image": {
                    "id": "f0927f2c-7b84-4bc9-ac8c-a0891ffb16d4",
                    "links": [
                        {
                            "href": "https://iad.servers.api.rackspacecloud.com/1340444/images/f0927f2c-7b84-4bc9-ac8c-a0891ffb16d4",
                            "rel": "bookmark"
                        }
                    ]
                },
                "RAX-PUBLIC-IP-ZONE-ID:publicIPZoneId": "63b4dc9f00284ffaebfdfc5c050831dbc09d435a544aafcc41c3711d",
                "OS-EXT-STS:task_state": null,
                "OS-EXT-STS:vm_state": "active",
                "flavor": {
                    "id": "general1-2",
                    "links": [
                        {
                            "href": "https://iad.servers.api.rackspacecloud.com/1340444/flavors/general1-2",
                            "rel": "bookmark"
                        }
                    ]
                },
                "id": "fd7a6dc5-768f-467f-8dd1-990aeddd4248",
                "user_id": "96be28096efd4c42aca2ddc5176f9880",
                "name": "pooler-VM-1751313725676",
                "created": "2025-06-30T20:02:07Z",
                "tenant_id": "1340444",
                "OS-DCF:diskConfig": "MANUAL",
                "accessIPv4": "104.130.13.209",
                "accessIPv6": "2001:4802:7803:104:be76:4eff:fe20:2aea",
                "progress": 100,
                "OS-EXT-STS:power_state": 1,
                "metadata": {
                    "server_name": "my-test-vm-1-keypair-final",
                    "tenant_id": "1340444",
                    "region": "iad",
                    "cloud_environment": "ospc",
                    "image": "ubuntu 20.04 lts (focal fossa) (cloud)",
                    "timestamp": "2025-07-01T01:32:05.676555",
                    "flavor": "general",
                    "rax_service_level_automation": "Complete",
                    "bid_price": 0.99
                }
            }
        ],
        [ {
              "status": "available",
              "display_name": "test-VM-volume-1",
              "attachments": [],
              "availability_zone": "nova",
              "bootable": "false",
              "encrypted": false,
              "created_at": "2025-07-01T10:44:45.000000",
              "multiattach": "false",
              "display_description": "Creating Volume for test VM",
              "volume_type": "SATA",
              "snapshot_id": null,
              "source_volid": null,
              "metadata": {
                  "storage-node": "257d1849-f602-49c5-8204-0185c5142a53"
              },
              "id": "d20580f6-9cbf-48e3-b334-afa59b8b94f6",
              "size": 75
          }
      ], 
        [{
            "public_key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDBCANRDvMwqw5k3xSvmdUZz6hkQ7IkW57hfEMpjbfncp1lid6vdo0aFqbTRaU231mQD8fJNjg/qHk+ujvhf4tgXA2fRq2QTuSYMDimq8tuBFgTS+aIsCAg+pGIg1smJAIqcWw6nABNYTtEKK475oTKYTKmy8Ysk+3K83aK8CSWFSOtZDYfLKZLBA+3/fK4fR6nyTuhpJfijo5X+wfBhJUNeqJRpwEqILcnuHLk2dSpjgUv0L+lJ1bvTqETdNHNr/qyEVrcpS6G66Dk0OpJaQbeCsB+dw2ueFiBQIVwbe0biYqXPIrtpyZIVcPZwSk149S4kE8MZETUYNxJn158D/A9 Generated-by-Nova",
            "name": "my-test-vm-1-key-pair",
            "fingerprint": "ce:2e:a7:ec:99:a8:03:f8:78:a5:be:f2:1c:96:62:1b"
        }]
    ,[{
          "name": "security-group-1",
          "tenant_id": "1340444",
          "security_group_rules": [
              {
                  "direction": "ingress",
                  "protocol": "TCP",
                  "description": null,
                  "port_range_max": 22,
                  "external_service_id": null,
                  "external_service": null,
                  "security_group_id": "31ebd752-fc70-4bab-b9de-9b671101ee57",
                  "ethertype": "IPv4",
                  "remote_group_id": null,
                  "remote_ip_prefix": null,
                  "id": "5733000c-bc20-48e4-80f0-884fab6bd6bd",
                  "port_range_min": 22,
                  "tenant_id": "1340444"
              },
              {
                  "direction": "egress",
                  "protocol": "ICMP",
                  "description": null,
                  "port_range_max": 0,
                  "external_service_id": null,
                  "external_service": null,
                  "security_group_id": "31ebd752-fc70-4bab-b9de-9b671101ee57",
                  "ethertype": "IPv4",
                  "remote_group_id": null,
                  "remote_ip_prefix": null,
                  "id": "61457a2f-b24a-4b46-aaa0-88993c8b800b",
                  "port_range_min": 0,
                  "tenant_id": "1340444"
              },
              {
                  "direction": "ingress",
                  "protocol": "TCP",
                  "description": null,
                  "port_range_max": 80,
                  "external_service_id": null,
                  "external_service": null,
                  "security_group_id": "31ebd752-fc70-4bab-b9de-9b671101ee57",
                  "ethertype": "IPv4",
                  "remote_group_id": null,
                  "remote_ip_prefix": null,
                  "id": "7c6b5a63-dd78-4dbf-84e9-b8f54c745a92",
                  "port_range_min": 80,
                  "tenant_id": "1340444"
              },
              {
                  "direction": "ingress",
                  "protocol": "ICMP",
                  "description": null,
                  "port_range_max": 0,
                  "external_service_id": null,
                  "external_service": null,
                  "security_group_id": "31ebd752-fc70-4bab-b9de-9b671101ee57",
                  "ethertype": "IPv4",
                  "remote_group_id": null,
                  "remote_ip_prefix": null,
                  "id": "ce8c0976-225f-4e23-b759-8b8a2cdce2a9",
                  "port_range_min": 8,
                  "tenant_id": "1340444"
              }
          ],
          "external_service_id": null,
          "external_service": null,
          "id": "31ebd752-fc70-4bab-b9de-9b671101ee57",
          "description": "Group for testing rules"
      }
  ],[
    {
        "direction": "ingress",
        "protocol": "TCP",
        "description": null,
        "port_range_max": 22,
        "external_service_id": null,
        "external_service": null,
        "security_group_id": "31ebd752-fc70-4bab-b9de-9b671101ee57",
        "ethertype": "IPv4",
        "remote_group_id": null,
        "remote_ip_prefix": null,
        "id": "5733000c-bc20-48e4-80f0-884fab6bd6bd",
        "port_range_min": 22,
        "tenant_id": "1340444"
    },
    {
        "direction": "egress",
        "protocol": "ICMP",
        "description": null,
        "port_range_max": 0,
        "external_service_id": null,
        "external_service": null,
        "security_group_id": "31ebd752-fc70-4bab-b9de-9b671101ee57",
        "ethertype": "IPv4",
        "remote_group_id": null,
        "remote_ip_prefix": null,
        "id": "61457a2f-b24a-4b46-aaa0-88993c8b800b",
        "port_range_min": 0,
        "tenant_id": "1340444"
    },
    {
        "direction": "ingress",
        "protocol": "TCP",
        "description": null,
        "port_range_max": 80,
        "external_service_id": null,
        "external_service": null,
        "security_group_id": "31ebd752-fc70-4bab-b9de-9b671101ee57",
        "ethertype": "IPv4",
        "remote_group_id": null,
        "remote_ip_prefix": null,
        "id": "7c6b5a63-dd78-4dbf-84e9-b8f54c745a92",
        "port_range_min": 80,
        "tenant_id": "1340444"
    },
    {
        "direction": "ingress",
        "protocol": "ICMP",
        "description": null,
        "port_range_max": 0,
        "external_service_id": null,
        "external_service": null,
        "security_group_id": "31ebd752-fc70-4bab-b9de-9b671101ee57",
        "ethertype": "IPv4",
        "remote_group_id": null,
        "remote_ip_prefix": null,
        "id": "ce8c0976-225f-4e23-b759-8b8a2cdce2a9",
        "port_range_min": 8,
        "tenant_id": "1340444"
    }
]
        ]
        // const data = {
        //   vms: await vmsRes.json(),
        //   volumes: await volumesRes.json(),
        //   keyPairs: await keyPairsRes.json(),
        //   securityGroups: await sgRes.json(),
        //   securityGroupRules: await sgRulesRes.json()
        // };
        const data = {
          vms:  vmsRes,
          volumes: volumesRes,
          keyPairs: keyPairsRes,
          securityGroups: sgRes,
          securityGroupRules: sgRulesRes
        };
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [location.state]);

  const handleDeleteVm = async (vmId) => {
    try {
      // API call to delete VM
      await fetch(`/api/vms/${vmId}`, { method: 'DELETE' });
      
      // Update local state
      const updatedVms = resources.vms.filter(vm => vm.id !== vmId);
      const volumesToKeep = resources.volumes.filter(vol => 
        !vol.attachments?.some(att => att.server_id === vmId)
      );
      
      setResources({
        ...resources,
        vms: updatedVms,
        volumes: volumesToKeep
      });
    } catch (error) {
      console.error('Failed to delete VM:', error);
    }
  };

  const handleDeleteVolume = async (volumeId) => {
    try {
      await fetch(`/api/volumes/${volumeId}`, { method: 'DELETE' });
      setResources({
        ...resources,
        volumes: resources.volumes.filter(vol => vol.display_name !== volumeId)
      });
    } catch (error) {
      console.error('Failed to delete volume:', error);
    }
  };

  const handleDeleteKeyPair = async (keyName) => {
    try {
      await fetch(`/api/keypairs/${keyName}`, { method: 'DELETE' });
      setResources({
        ...resources,
        keyPairs: resources.keyPairs.filter(kp => kp.name !== keyName)
      });
    } catch (error) {
      console.error('Failed to delete key pair:', error);
    }
  };

  const handleDeleteSecurityGroup = async (sgId) => {
    try {
      await fetch(`/api/security-groups/${sgId}`, { method: 'DELETE' });
      const updatedSGs = resources.securityGroups.filter(sg => sg.name !== sgId);
      const updatedSGRules = resources.securityGroupRules.filter(
        rule => !updatedSGs.some(sg => sg.name === rule.security_group_id)
      );
      
      setResources({
        ...resources,
        securityGroups: updatedSGs,
        securityGroupRules: updatedSGRules
      });
    } catch (error) {
      console.error('Failed to delete security group:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading dashboard resources...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>VM on Spot Dashboard</h1>
        <CreateVmButton />
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'vms' ? 'active' : ''}`}
          onClick={() => setActiveTab('vms')}
        >
          Virtual Machines
        </button>
        <button 
          className={`tab-btn ${activeTab === 'volumes' ? 'active' : ''}`}
          onClick={() => setActiveTab('volumes')}
        >
          Volumes
        </button>
        <button 
          className={`tab-btn ${activeTab === 'keypairs' ? 'active' : ''}`}
          onClick={() => setActiveTab('keypairs')}
        >
          Key Pairs
        </button>
        <button 
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security Groups
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'vms' && (
          <VmList vms={resources.vms} onDelete={handleDeleteVm} />
        )}
        {activeTab === 'volumes' && (
          <VolumeList volumes={resources.volumes} onDelete={handleDeleteVolume} />
        )}
        {activeTab === 'keypairs' && (
          <KeyPairList keyPairs={resources.keyPairs} onDelete={handleDeleteKeyPair} />
        )}
        {activeTab === 'security' && (
          <SecurityGroupList 
            securityGroups={resources.securityGroups} 
            securityGroupRules={resources.securityGroupRules}
            onDelete={handleDeleteSecurityGroup}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;