import { useEffect, useState } from "react";
import Cards from "./Cards";

const toMilliseconds = (time) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600000 + minutes * 60000 + seconds * 1000;
};

function Item({ data, pos }) {
  const refreshInterval = data.refreshInterval;
  const [flag, setFlag] = useState(true);
  const [cur, setCur] = useState(0);

  const opens = data?.res?.map((item) => {
    return item.o;
  });
  const close = data?.res?.map((item) => {
    return item.c;
  });
  const times = data?.res?.map((item) => {
    return item.t;
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      var d = `${hours}:${minutes}:${seconds}`;
      let tempidx = 0;
      times?.forEach((time, idx) => {
        // console.log(d, time);

        const date = new Date(time).toISOString().slice(11, 19);
        // console.log(d, date);
        if (toMilliseconds(d) >= toMilliseconds(date)) {
          tempidx = idx;
        }
      });

      // console.log(tempidx);

      if (tempidx === 0) setFlag(true);
      else {
        setFlag(opens[tempidx] - close[tempidx] >= 0);
      }

      setCur(tempidx);

      // console.log(opens[tempidx] - close[tempidx] >= 0);
      // console.log(tempidx);
    }, 16000 * refreshInterval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="items-center p-4 m-2 w-80 h-30">
      <Cards name={data.name} flag={flag} opening={opens[cur]} idx={pos} />
    </div>
  );
}

export default Item;
