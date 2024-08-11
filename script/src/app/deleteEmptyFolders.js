import fs from "node:fs";
import path from "path";

export const deleteEmptyFolders = async (dir) => {
  const findFolders = [dir];
  const stack = [dir];

  while (findFolders.length > 0) {
    const currentPath = findFolders.pop();
    if (!currentPath) continue;

    const direntList = await fs.promises.readdir(currentPath, {
      withFileTypes: true,
    });

    for (const dirent of direntList) {
      const fullPath = path.join(currentPath, dirent.name);

      if (dirent.isDirectory()) {
        stack.push(fullPath);
        findFolders.push(fullPath);
      }
    }
  }

  while (stack.length > 0) {
    const currentDir = stack.pop();
    if (!currentDir) break;

    try {
      const files = await fs.promises.readdir(currentDir);

      if (files.length === 0) {
        try {
          await fs.promises.rmdir(currentDir);
        } catch (error) {
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${currentDir}:`, error);
    }
  }
};