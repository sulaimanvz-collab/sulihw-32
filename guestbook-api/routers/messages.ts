import { Router } from "express";
import { db } from "../db";
import { imagesUpload } from "../multer";
import { Message } from "../types";

export const messagesRouter = Router();

messagesRouter.get("/", async (_req, res, next) => {
  try {
    const messages = await db.getMessages();
    res.send(messages);
  } catch (e) {
    next(e);
  }
});

messagesRouter.post(
  "/",
  imagesUpload.single("image"),
  async (req, res, next) => {
    try {
      const { author, message } = req.body;

      if (!message || message.trim() === "") {
        res.status(400).send({ error: "Message field is required" });
        return;
      }

      const newMessage: Message = {
        id: crypto.randomUUID(),
        author: author && author.trim() !== "" ? author.trim() : "Anonymous",
        message: message.trim(),
        image: req.file ? req.file.filename : null,
      };

      await db.addMessage(newMessage);
      res.send(newMessage);
    } catch (e) {
      next(e);
    }
  },
);
