import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../src/data.css'; // Import CSS file

const SheetData = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
   
    let intervalId;
    if (isFetching) {
      intervalId = setInterval(fetchData, 10000);
    }
   
    return () => clearInterval(intervalId);
  }, [isFetching]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/sheetData');
      setData(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFetchData = () => {
  
    setIsFetching(true);
   
    fetchData();
  };

  return (
    <div className="app-container"> 
    <div className="header">
    <h1>Wherehouse.io</h1>
  </div>
    <div className="table-container">
      <div className="table-header">
        <h2>Data from Google Sheet</h2>
        <div>
           
            <Button variant="primary" onClick={handleFetchData} className="fetch-button">Fetch Data</Button>
          </div>
      </div>
      {data.length > 0 ? (
        <table className="data-table"> 
       
          <thead style={{backgroundColor:"#2d2e36"}}>
            <tr>
              {data[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead> 
         
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  </div>
  );
};

export default SheetData;
