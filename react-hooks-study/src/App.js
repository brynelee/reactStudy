import logo from './logo.svg';
import './App.css';
import CounterClass from './components/counterClass'
import CounterHook from './components/counterHook'
import CounterHookUseReducer from './components/counterHookuseReducer'
import Coffee from './components/coffee';

function App() {
  return (
    <div className="App">
      <div>
        <CounterClass />
      </div>
      <br />
      <div>
        <CounterHook initialState={20} />
      </div>
      <div>
        <Coffee />
      </div>
      <br/>
      <p>useReducer</p>
      <CounterHookUseReducer />
    </div>
  );
}

export default App;
