import React, { useState } from "react";
import Digit from "./Digit";
import "./App.css";

interface IAppState {
  number: number;
  base: number;
}

function getBases() {
  const bases: number[] = [];
  for (let i = 2; i <= 16; i++) {
    bases.push(i);
  }
  return bases;
}

function App() {
  const [state, setState] = useState<IAppState>({
    number: 10,
    base: 10,
  });

  const isNumberTooBig = (value: number, base: number): boolean => {
    return value.toString(base).length > 16;
  };

  const changeNumber = (newValue: number) => {
    if (newValue >= 0 && !isNumberTooBig(newValue, state.base)) {
      setState({
        ...state,
        number: newValue,
      });
    }
  };

  const changeNumberBy = (diff: number) => changeNumber(state.number + diff);

  const changeBase = (newBase: number) => {
    if (isNumberTooBig(state.number, newBase)) return;

    setState({
      ...state,
      base: newBase,
    });
  };
  const getDigits = (number: number, base: number) => {
    return number
      .toString(base)
      .split("")
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
          placeholder="Input the number here"
          value={state.number}
          onChange={(event) =>
            changeNumber(
              event.target.value !== "" ? parseInt(event.target.value) : 0
            )
          }
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
