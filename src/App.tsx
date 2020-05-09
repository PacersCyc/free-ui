import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button'
// import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button autoFocus onClick={() => console.log(1)}>hellow world</Button>
        <Button disabled>click me</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>click me</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">click me</Button>
        <Button btnType={ButtonType.Danger}>click me</Button>
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
