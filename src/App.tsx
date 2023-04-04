import React from 'react';
import AppHeader from './Frame/AppHeader';
import './App.scss';
import GameWindow from './Frame/GameWindow';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppHeader/>
      </header>
      <GameWindow/>
    </div>
  );
}

export default App;
