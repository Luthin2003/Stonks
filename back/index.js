import { restClient } from "@polygon.io/client-js";
import axios from "axios";
import fs from "fs";
import express from "express";
import { stringify } from "querystring";
import cors from "cors";

const PORT = 8000;

const POLY_API_KEY = "6kphfWKczYATfWYh1Tcwha7nleDn7JUD";

var datecur = new Date().toISOString().slice(0, 10);
var dateyes = new Date();
dateyes.setDate(dateyes.getDate() - 1);
dateyes = dateyes.toISOString().slice(0, 10);

const data = [];
const company_list = [
  { ticker: "AAPL", name: "Apple Inc" },
  { ticker: "MSFT", name: "Microsoft Corporation" },
  { ticker: "GOOG", name: "Alphabet Inc class C" },
  { ticker: "GOOGL", name: "Alphabet Inc class A" },
  { ticker: "AMZN", name: "Amazon" },
  { ticker: "NVDA", name: "NVIDIA Corporation" },
  { ticker: "TSLA", name: "Tesla Inc" },
  { ticker: "TSM", name: "Taiwan Semiconductor" },
  { ticker: "JPM", name: "JP Morgan Inc" },
  { ticker: "LLY", name: "Eli Lilly and Company" },
];

const fetchStockData = async (ticker, name) => {
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/minute/${dateyes}/${datecur}?adjusted=true&sort=asc&limit=5000`;
  const apiKey = POLY_API_KEY;
  const response = await axios.get(url, {
    params: {
      apiKey,
    },
  });
  const res = await response.data.results;

  data.push({ name, refreshInterval: Math.floor(Math.random() * 5) + 1, res });
  return response.data;
};

const fetchcompany = async () => {
  function fetchDataWithDelay() {
    let delay = 0;

    company_list.forEach((item) => {
      setTimeout(function () {
        console.log(item);
        fetchStockData(item.ticker, item.name);
      }, delay);

      delay += 15000; // Increment the delay for each iteration (1 minute)
    });
  }
  fetchDataWithDelay();
};

fetchcompany();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  try {
    res.json(data);
  } catch (err) {
    res.status(404);
    res.send({ msg: "error during fetching" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
