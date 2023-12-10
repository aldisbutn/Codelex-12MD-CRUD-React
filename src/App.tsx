import React, { useState, useEffect } from 'react';
import { Create } from './components/Create';
import { DisplayAndEdit } from './components/DisplayAndEdit';
import { Header } from './components/Header';
import axios from 'axios';
import './App.css';

const App = () => {
  const [driverCount, setDriverCount] = useState(0);

  // Get the initial driver count when the page loads
  useEffect(() => {
    axios.get('http://localhost:3002/drivers').then((response) => {
      setDriverCount(response.data.length);
    });
  }, []);

  // Function to delete a driver and update the driver count
  const deleteDriverAndUpdateCount = (id: number) => {
    axios.delete(`http://localhost:3002/drivers/${id}`).then(() => {
      axios.get('http://localhost:3002/drivers').then((response) => {
        setDriverCount(response.data.length);
      });
    });
  };

  return (
    <>
      <Header driverCount={driverCount} />
      <DisplayAndEdit deleteDriverAndUpdateCount={deleteDriverAndUpdateCount} />
      <Create />
    </>
  );
};

export default App;
