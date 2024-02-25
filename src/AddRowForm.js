// AddRowForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddRowForm = ({ onAddRow }) => {
  const [rowData, setRowData] = useState({
    id: '',
    avatarName: '',
    performanceScore: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRowData({ ...rowData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/addRow', rowData);
      setRowData({ id: '', avatarName: '', performanceScore: '' });
      onAddRow();
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="id" placeholder="ID" value={rowData.id} onChange={handleChange} />
      <input type="text" name="avatarName" placeholder="Avatar Name" value={rowData.avatarName} onChange={handleChange} />
      <input type="text" name="performanceScore" placeholder="Performance Score" value={rowData.performanceScore} onChange={handleChange} />
      <button type="submit">Add Row</button>
    </form>
  );
};

export default AddRowForm;
