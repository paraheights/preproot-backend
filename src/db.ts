import mongoose from "mongoose";

// const dbURI: string = "mongodb://localhost:27017/preproot";
const dbURI: string = `mongodb://${process.env.mongoDBUser}:${process.env.mongoDBPassword}@${process.env.mongoDBIP}:${process.env.mongoDBPort}/${process.env.mongoDBName}`;

mongoose.set("strictQuery", false);

mongoose.connect(dbURI);

mongoose.connection.on("error", async (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Mongoose connection disconnected`);
});
