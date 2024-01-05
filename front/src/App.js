import React, { useEffect, useState } from "react";
import "./App.css";
import Item from "./Item";

function App({ data, setData }) {
  const [num, setNum] = useState(0);
  const displayedData = data?.slice(0, num);

  useEffect(function () {
    try {
      const fetchfunction = async () => {
        const res = await fetch("http://localhost:8000/api");
        const datajson = await res.json();

        setData(datajson);
      };

      fetchfunction();
    } catch (err) {
      console.log("err while fetching");
    }
  }, []);

  return (
    <div className="App">
      <div className="p-10 flex flex-col">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Stonks.
          </span>
        </h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Here at Stonks we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>

        <form class="max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
          <p class="text-2xl p-5 font-semibold text-gray-600/100 dark:text-slate-500/100">
            Enter the number of stocks
          </p>
          <input
            type="number"
            id="number-input"
            aria-describedby="helper-text-explanation"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
            value={num}
            onChange={(e) => {
              e.preventDefault();
              if (e.target.value <= 10 && e.target.value >= 0) {
                e.preventDefault();
                setNum(e.target.value);
              }
            }}
          />
        </form>

        <div className="flex flex-wrap items-center place-content-center">
          {displayedData.map((item, idx) => (
            <Item key={idx} data={item} pos={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
