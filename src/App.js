import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'ABCD123'; // Replace with your roll number
  }, []);

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(jsonInput);
      const response = await axios.post('http://localhost:8000/bfhl', { data });
      setResponseData(response.data);
    } catch (error) {
      console.error('Error:', error.message);
      setError('There was an error with the request.');
    }
  };
  

  const handleSelection = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions(prevState =>
      checked ? [...prevState, value] : prevState.filter(option => option !== value)
    );
  };

  const renderResponse = () => {
    if (!responseData) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;

    const filteredData = {};
    if (selectedOptions.includes('Numbers')) filteredData.numbers = numbers;
    if (selectedOptions.includes('Alphabets')) filteredData.alphabets = alphabets;
    if (selectedOptions.includes('Highest lowercase alphabet')) filteredData.highest_lowercase_alphabet = highest_lowercase_alphabet;

    return <pre>{JSON.stringify(filteredData, null, 2)}</pre>;
  };

  return (
    <div>
      <h1>ABCD123</h1>
      <textarea value={jsonInput} onChange={e => setJsonInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
  
      {error && <p>{error}</p>}
  
      {responseData && (
        <div>
          <label>
            <input type="checkbox" value="Numbers" onChange={handleSelection} />
            Numbers
          </label>
          <label>
            <input type="checkbox" value="Alphabets" onChange={handleSelection} />
            Alphabets
          </label>
          <label>
            <input type="checkbox" value="Highest lowercase alphabet" onChange={handleSelection} />
            Highest lowercase alphabet
          </label>
  
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
