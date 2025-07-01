import React from 'react';

const Welcome = ({ nextStep }) => {
  return (
    <div className="form-container">
      <h2>Welcome to VM on Spot Platform</h2>
      <p>
        We offer raw VM at cost of spot instances by following bidding based mechanism there.
        You have to bid for nos of VM needed depending on your needs.
      </p>
      <p>
        We also offer facility to attach keypair values for SSH, or import your own as well, 
        then attach security group, security group rules, attach volume to VM, accordingly 
        can create your own network and subnets as well in near future.
      </p>
      <button onClick={nextStep} className="btn-next">Get Started</button>
    </div>
  );
};

export default Welcome;