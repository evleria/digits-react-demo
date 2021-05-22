import React from "react";
import "./Digit.css";

interface IDigitProps {
  digit: string;
  value: number;
  onChange: (diff: number) => void;
}
export default function Digit(props: IDigitProps) {
  return (
    <div className="digit">
      <div className="number">{props.digit.toUpperCase()}</div>
      <div>
        <button onClick={() => props.onChange(props.value)}>+</button>
        <button onClick={() => props.onChange(-props.value)}>-</button>
      </div>
      <div className="value">{props.value}</div>
    </div>
  );
}
