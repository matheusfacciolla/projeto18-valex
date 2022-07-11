import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import "express-async-errors";

import "./config/setup.js";
import router from "./routers/index.js";
import handleErrorsMiddleware from "./middlewares/handleErrorsMiddleware.js";

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(handleErrorsMiddleware);
const port: number = +process.env.PORT || 5000;

app.listen(port, () => {
  console.log(chalk.bold.green(`Server is running on port: ${port}`));
});

export default app;
