import { Route, Routes } from "react-router-dom";
import App from "./App";
import Stock from "./Stock";
import { useState } from "react";

const intilialdata = [];
function Mainele() {
  const [data, setData] = useState(intilialdata);
  return (
    <Routes>
      <Route path="/" element={<App data={data} setData={setData} />} />
      <Route path="/company/:id" element={<Stock data={data} />} />
      <Route />
    </Routes>
  );
}

export default Mainele;
