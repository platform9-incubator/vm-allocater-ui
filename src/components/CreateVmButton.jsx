import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateVmButton = () => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate('/');
  };

  return (
    <button onClick={handleCreateNew} className="btn-create">
      + Create New VM
    </button>
  );
};

export default CreateVmButton;