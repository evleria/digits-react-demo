import React, { useState } from "react";
import Digit from "./Digit";
import "./App.css";

interface IAppState {
  number: number;
  base: number;
}

function getBases() {
  const bases: number[] = [];
  for (let i = 2; i <= 10; i++) {
    bases.push(i);
  }
  return bases;
}

function App() {
  const [state, setState] = useState<IAppState>({
    number: 10,
    base: 10,
  });

  function changeNumber(newValue: number) {
    if (newValue >= 0) {
      setState({
        ...state,
        number: newValue,
      });
    }
  }

  const changeNumberBy = (diff: number) => changeNumber(state.number + diff);

  const changeBase = (newBase: number) => {
    setState({
      ...state,
      base: newBase,
    });
  };
  const getDigits = (number: number, base: number) => {
    return number
      .toString(base)
      .split("")
      .map((s) => parseInt(s, 10))
      .map((n, i, arr) => (
        <Digit
          key={arr.length - i - 1}
          digit={n}
          value={Math.pow(base, arr.length - i - 1)}
          onChange={changeNumberBy}
        />
      ));
  };

  return (
    <div className="App">
      <div className="top-panel">
        <input
          type="number"
          placeholder="Input the number here"
          min="0"
          value={state.number}
          onChange={(event) => changeNumber(parseInt(event.target.value))}
        />
        <button onClick={() => changeNumberBy(1)}>+</button>
        <button onClick={() => changeNumberBy(-1)}>-</button>
        <select
          value={state.base}
          onChange={(event) => changeBase(parseInt(event.target.value))}
        >
          {getBases().map((base) => (
            <option key={base} value={base}>
              {base}
            </option>
          ))}
        </select>
      </div>
      <div className="bottom-panel">{getDigits(state.number, state.base)}</div>
    </div>
  );
}

export default App;
