import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  openPrice: { type: Number, required: true },
  flag: { type: Boolean, required: true },
  refreshInterval: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
