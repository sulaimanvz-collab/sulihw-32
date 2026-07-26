import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import { config } from "./config";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, config.publicPath);
  },
  filename: (_req, file, cb) => {
    cb(null, randomUUID() + path.extname(file.originalname));
  },
});

export const imagesUpload = multer({ storage });
