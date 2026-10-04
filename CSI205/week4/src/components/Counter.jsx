import { useState, useEffect } from "react";

const Counter = ({ name, initCount, stepSize, limit }) => {
  const _name = name || "Counter";
  const [count, setCount] = useState(initCount || 0);
  const _stepSize = stepSize || 1;
  const _limit = limit || 100;

  useEffect(() => {
    if (count >= _limit) alert("over limit")
  }, [count, _limit]);

  useEffect(() => {
    setCount(initCount || 0)   
  }, [initCount]);

  return (
    // counter component
    <div className="text-center border border-black border-2 rounded p-3 m-3">
      <h1 className="font-weight-bold ">
        {_name} &nbsp;Step: {_stepSize} &nbsp;Limit: {_limit}
      </h1>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-lg btn-danger"
          onClick={() => setCount((c) => c - _stepSize)}
        >
          <span className="bi bi-dash-circle-dotted"></span>
        </button>
        <span className={"fs-1 mx-3" + (count >= _limit ? " text-danger" : "")}>
          {count}
        </span>
        <button
          className="btn btn-lg btn-success"
          onClick={() => {setCount((c) => c + _stepSize)}}
        >
          <span className="bi bi-plus-circle-dotted"></span>
        </button>
      </div>
    </div>
  );
};

export default Counter;
