import fsAsync from "node:fs/promises";
import path from "path";
import { getHashReq } from "../services/index.js";

export const getFiles = async (dirPath, ignore) => {
  const stack = [dirPath];
  const driveRes = [];

  while (stack.length > 0) {
    const currentPath = stack.pop();
    if (!currentPath) continue;

    const direntList = await fsAsync.readdir(currentPath, {
      withFileTypes: true,
    });

    for (const dirent of direntList) {
      const fullPath = path.join(currentPath, dirent.name);
      const abstractPath = path.relative(dirPath, currentPath);

      if (dirent.isDirectory()) {
        if (ignore.path.includes(fullPath)) continue;
        if (ignore["dir-name"].includes(dirent.name)) continue;

        stack.push(fullPath);
      } else if (dirent.isFile()) {
        const fileStat = await fsAsync.stat(fullPath);

        if (ignore.path.includes(fullPath)) continue;
        if (ignore["file-name"].includes(dirent.name)) continue;

        const getHashRes = await getHashReq(fullPath)

        const fileData = {
          name: dirent.name,
          path: fullPath,
          abstractPath: abstractPath !== "" ? `\\${abstractPath}` : ".",
          size: fileStat.size,
          hash: getHashRes.hash,
        };

        driveRes.push(fileData);
      }
    }
  }

  return driveRes;
};