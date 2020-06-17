import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

interface AppProps 
{
  message: string
};

interface AppState 
{
  count: number;
}

class ReactComponent extends React.Component<AppProps, AppState>
{
  state: AppState = {
    count: 0
  }
}

function App() {
  return (
    <div className="App">
      <div id="image-box">
        // available images
      </div>
      <div id="board">
        // image board.
      </div>      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
