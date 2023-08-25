import logo from './logo.svg';
import './App.css';

const mirisfunction = () => {
  console.log("Miri is the best");
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      <button onclick={mirisfunction} ></button>
      </header>
    </div>
  );
}

export default App;
