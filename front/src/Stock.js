import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";

const toMilliseconds = (time) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600000 + minutes * 60000 + seconds * 1000;
};

function Stock({ data }) {
  const { id } = useParams();
  data = data[id];
  const name = data?.name;
  const times = data?.res?.map((item) => {
    const date = new Date(item.t).toISOString();
    return date;
  });
  const open = data?.res?.map((item) => {
    return item.o;
  });

  const [curtime, setCurtime] = useState([]);
  const [curopen, setCuropen] = useState([]);

  const refreshInterval = data?.refreshInterval;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      var d = `${hours}:${minutes}:${seconds}`;

      const tempOpen = [];

      const temptime = [];
      times?.forEach((time, idx) => {
        time = time.slice(11, 19);
        // console.log(time, d);
        // console.log(toMilliseconds(d) >= toMilliseconds(time));
        if (toMilliseconds(d) <= toMilliseconds(time)) {
          console.log(d, time);
          tempOpen.push(open[idx]);
          temptime.push(times[idx]);
        }
      });

      setCurtime(temptime);
      setCuropen(tempOpen);
    }, 60000 * refreshInterval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* <h1>}</h1> */}
      <Plot
        data={[
          {
            x: times, // change this to curtimes and curopen
            y: open,
            type: "scatter",
            mode: "lines+markers",
          },
        ]}
        layout={{ width: 1080, height: 720, title: name }}
      />
    </div>
  );
}

export default Stock;
