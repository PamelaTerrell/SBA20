import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);

  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  
  const fetchAdvice = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.adviceslip.com/advice');
      const newAdvice = response.data.slip.advice;
      setAdvice(newAdvice);

    
      addToHistory(newAdvice);
    } catch (error) {
      console.error('Error fetching advice:', error);
      setAdvice('Oops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  
  const addToHistory = (newAdvice) => {
    const updatedHistory = [...history, newAdvice];
    setHistory(updatedHistory);
    localStorage.setItem('history', JSON.stringify(updatedHistory));
  };

  
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <div className="App">
      <h1>Random Advice</h1>
      
      <div className="advice-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>{advice}</p>
        )}
      </div>

      
      <button onClick={fetchAdvice} disabled={loading}>
        Get New Advice
      </button><br />

      
      <button onClick={toggleTheme}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      
      <h2>Advice History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

