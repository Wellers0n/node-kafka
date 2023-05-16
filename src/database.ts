import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/node-kafka";

export default function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on("error", (error) => reject(error))
      .on("close", () => console.log("Database connection closed."))
      .once("open", () => resolve(mongoose.connections[0]));

    mongoose.connect(uri);
  });
}
