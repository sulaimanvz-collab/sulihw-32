import path from "path";

const rootPath = __dirname;

export const config = {
  rootPath,
  publicPath: path.join(rootPath, "public"),
};
