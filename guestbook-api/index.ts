import express from "express";
import cors from "cors";
import { db } from "./db";
import { messagesRouter } from "./routers/messages";
import { config } from "./config";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(config.publicPath));

app.use("/messages", messagesRouter);

const run = async () => {
  await db.init();

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
};

void run();
