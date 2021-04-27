import express from "express";
import cors from "cors";
import articles from "./articles/index.js";
import ErrorResponse from "./lib/errorResponse.js";
import mongoose from "mongoose";
import {
  notFoundErrorHandler,
  badRequestErrorHandler,
  catchAllErrorHandler,
} from "./lib/errorHandlers.js";
import listEndpoints from "express-list-endpoints";

const app = express();

const whiteList = [process.env.FE_URL_DEV, process.env.FE_URL_PROD];

const corsOptions = {
  origin: function (origin, next) {
    if (whiteList.indexOf(origin) !== -1) {
      console.log("ORIGIN: ", origin);

      next(null, true);
    } else {
      next(new ErrorResponse(`NOT ALLOWED BY CORS`, 403));
    }
  },
};

app.use(cors());
app.use(express.json());

app.use("/articles", articles);

app.use(badRequestErrorHandler);
app.use(notFoundErrorHandler);
app.use(catchAllErrorHandler);

const PORT = process.env.PORT || 5000;
console.log(listEndpoints(app));
console.log(process.env.MONGODB_ADDRESS);
mongoose
  .connect(process.env.MONGODB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    app.listen(PORT, () => {
      console.log("Running on port", PORT);
    })
  )
  .catch((err) => console.log(err));
