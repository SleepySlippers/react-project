import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import data from './assets/mock-data.json';
import Card from './components/Card.js';
import Tiler from './components/Tiler.js';

function App() {
  const [items] = useState(data);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cards grid</h1>
        <Tiler key="tiler" items={items} card={Card}  />
      </header>
    </div>
  );
}

export default App;
