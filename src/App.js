import React from 'react';
import './App.css';
import Headers from './components/headers';
import Filter from './components/filter';
import Robots from './components/robots';

function App() {
  return (
    <div className="App">
      <Headers />
      <Filter />
      <Robots />
    </div>
  );
}

export default App;
