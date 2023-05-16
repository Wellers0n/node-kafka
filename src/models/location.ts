import mongoose from "mongoose";
const Schema = mongoose.Schema;

const locations = new Schema({
  ip: {
    type: String,
    required: "IP is requerid",
  },
  timestamp: {
    type: Number,
    required: "timestamp is requerid",
  },
  latitude: {
    type: Number,
    required: "latitude is requerid",
  },
  longitude: {
    type: Number,
    required: "longitude is requerid",
  },
  country: {
    type: String,
    required: "country is requerid",
  },
  region: {
    type: String,
    required: "region is requerid",
  },
  city: {
    type: String,
    required: "city is requerid",
  },
  clientId: {
    type: String,
    require: "clientId is required",
  },
});

export default mongoose.model("locations", locations);
