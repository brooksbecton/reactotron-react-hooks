import React, { useState, useEffect } from "react";
import Reactotron from "reactotron-react-js";

const App: React.FC = () => {
  const defaultCountValue = 0;
  const defaultName = "";
  const [count, setCount] = useState(defaultCountValue);
  const [name, setName] = useState(defaultName);

  const handleIncrement = (currentCount: number) => {
    setCount(currentCount + 1);
  };
  const handleDecrement = (currentCount: number) => {
    setCount(currentCount - 1);
  };

  const handleReset = () => {
    setCount(defaultCountValue);
  };

  useEffect(() => {
    Reactotron.trackState({ count, name: { first: name, last: name } });
  }, [count, name]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "50%",
        paddingTop: "20%",
      }}
    >
      <>
        <label>
          Count:
          <input
            value={count}
            type="number"
            onChange={e => {
              setCount(Number(e.target.value));
            }}
          />
        </label>
        <button onClick={() => handleIncrement(count)}>+</button>
        <button onClick={() => handleDecrement(count)}>-</button>
        <button onClick={handleReset}>Reset</button>
      </>
      <div>
        <label>
          Name
          <input
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
