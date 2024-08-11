import fs from "node:fs";
import fsAsync from "node:fs/promises";

export const checkDirs = async ({ pathFrom, pathInto }) => {
  if (typeof pathFrom !== "string") exit("pathFrom is not a string");
  if (typeof pathInto !== "string") exit("pathInto is not a string");

  if (!fs.existsSync(pathFrom)) exit("pathFrom is not exist");
  if (!fs.existsSync(pathInto)) exit("pathInto is not exist");

  const infoFromDir = await fsAsync.stat(pathFrom);
  const infoIntoDir = await fsAsync.stat(pathInto);

  if (!infoFromDir.isDirectory()) exit("pathFrom is not a directory");
  if (!infoIntoDir.isDirectory()) exit("pathInto is not a directory");

  return {
    pathFrom,
    pathInto,

    infoFromDir,
    infoIntoDir,
  };
};

const exit = (msg) => {
  console.error(msg);
  process.exit(1);
};