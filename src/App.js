import './App.css';
import bricking from "./images/brickwall.gif";
import blueprints from "./images/blueprints.gif";
import worker from './images/en-construction.gif';
import MyComponent from './MyComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Comming Soon!</h1>
        <h2>gretchenkelly shop</h2>
        <img className="blue-prints" src={blueprints}></img>
        <img className="bricking" src={bricking}></img>
        <img className="worker" src={worker}/>
      </header>
      <MyComponent/>
    </div>
  );
}

export default App;
