import { promises as fs } from "fs";
import path from "path";
import { Message } from "./types";

const filename = path.join(__dirname, "messages.json");
let data: Message[] = [];

export const db = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch {
      data = [];
    }
  },
  async getMessages() {
    return data;
  },
  async addMessage(item: Message) {
    data.push(item);
    await this.save();
  },
  async save() {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
  },
};
