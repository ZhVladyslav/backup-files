import fs from "node:fs";
import stdio from "stdio";
import fsAsync from "node:fs/promises";

export const getIgnoreFile = async (ignore) => {
  if (ignore) {
    if (!fs.existsSync(ignore)) {
      console.error("file is not exist");
      process.exit(1);
    }

    const userConfig = await fsAsync.stat(ignore);

    if (!userConfig.isFile()) {
      console.error("Incorrect path to ignore file");
      process.exit(1);
    }

    const fileRes = await fsAsync.readFile(ignore, "utf8");
    return JSON.parse(fileRes);
  }

  if (!fs.existsSync("./ignore.json")) {
    const data = {
      path: [],
      hash: [],
      "file-name": [],
      "dir-name": [],
    };

    await fsAsync.writeFile("./ignore.json", JSON.stringify(data, null, 2));

    const res = await stdio.ask("Do you want change default ignore file?", { options: ["y", "n"] });
    if (res === "y") process.exit(0);

    return data;
  }

  const mainConfig = await fsAsync.readFile("./ignore.json", "utf8");
  return JSON.parse(mainConfig);
};