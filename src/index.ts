import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

import "./config/setup.js";
import router from "./routers/index.js";

const app = express();
app.use(cors());
app.use(json());
app.use(router);

const port: number = +process.env.PORT || 5000;

app.listen(port, () => {
  console.log(chalk.bold.green(`Server is running on port: ${port}`));
});

export default app;
