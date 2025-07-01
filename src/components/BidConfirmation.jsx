import React from 'react';

const BidConfirmation = ({ bidWon, loading, onProceed }) => {
  return (
    <div className='confirmation-container'>
      {loading ? (
        <div className='loading-state'>
          <div className='loader'></div>
          <p>Processing your bid... Please wait</p>
        </div>
      ) : bidWon ? (
        <div className='success-message'>
          <div className='success-icon'>✓</div>
          <h2>You won the bid!</h2>
          <p>
            We're now creating your VMs. Please wait patiently for a few
            minutes.
          </p>
          <p>All resources will be created shortly.</p>
          <button onClick={onProceed} className='btn-proceed'>
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div className='failed-message'>
          <div className='failed-icon'>✗</div>
          <h2>Bid Not Successful</h2>
          <p>
            Your bid wasn't successful this time. Please try again with a higher
            bid.
          </p>
          <button
            onClick={() => window.location.reload()}
            className='btn-retry'
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default BidConfirmation;
