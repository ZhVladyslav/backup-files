import fsAsync from "node:fs/promises";
import path from "path";
import { getHashReq } from "../api/getHashReq.js";

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

        // const fileHash = await getHashReadStream(fullPath);
        // if (ignore.hash.includes(fileHash)) continue;

        const fileData = {
          name: dirent.name,
          path: fullPath,
          abstractPath: abstractPath !== "" ? `\\${abstractPath}` : ".",
          size: fileStat.size,
          hash: /*fileHash*/ "",
        };

        driveRes.push(fileData);
      }
    }
  }

  console.info("## get hash");
  const pathToFiles = driveRes.map(item => item.path);
  const promises = [];

  const quantity = 1000

  for (let i = 0; i < Math.ceil(pathToFiles.length / quantity); i++) {
    const slice = pathToFiles.slice(i * quantity, (i + 1) * quantity);

    promises.push(getHashReq(slice));
  }

  const results = await Promise.all(promises);

  let resultIndex = 0;
  for (let i = 0; i < Math.ceil(pathToFiles.length / quantity); i++) {
    const slice = pathToFiles.slice(i * quantity, (i + 1) * quantity);

    for (let j = 0; j < slice.length; j++) {
      driveRes[resultIndex].hash = results[i][j];
      resultIndex++;
    }
  }

  return driveRes;
};