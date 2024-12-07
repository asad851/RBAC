import mongoose from "mongoose";
import config from "config";
import debug from "debug";
const dbgr = debug("development:mongoose");
const environment = process.env.NODE_ENV || "development";
const mongoUri =
"mongodb+srv://rightdoorhr:a93ub2pE1qRovVex@cluster0.o2tyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose
  .connect(mongoUri)
  .then(() => {
    dbgr("connected");
  })
  .catch((err) => console.log(err));

export default mongoose.connection;