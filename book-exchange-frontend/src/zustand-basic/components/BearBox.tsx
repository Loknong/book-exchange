import React, { useState } from "react";
import { useBearStore } from "../store/useBearStore";

export default function BearBox() {
  const [inputValue, setInputValue] = useState<number>(0);
  const bearsCount = useBearStore((state) => state.bears);
  const increaseOne = useBearStore((state) => state.increasePopulation);
  const decreaseOne = useBearStore((state) => state.decreasePopulation);
  const increaseBy = useBearStore((state) => state.increase);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    increaseBy(inputValue);
  };
  return (
    <div>
      <h1>Bear Box</h1>
      <h2>Bears: {bearsCount}</h2>
      <button onClick={increaseOne}>Add Bear</button>
      <button onClick={decreaseOne}>Remove Bear</button>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            className="border p-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Increase
          </button>
        </form>
      </div>
    </div>
  );
}
