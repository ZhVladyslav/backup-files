import { backupFile, deleteFile } from "../utils/file.js";
import path from "path";
import { ProgressBar } from "stdio";

export const runBackup = async (pathInto, checkFiles) => {
  const bar = new ProgressBar(checkFiles.length);

  for (const file of checkFiles) {
    switch (file.action) {
      case "delete-from":
        await deleteFile(file.path);
        break;
      case "delete-into":
        await deleteFile(file.path);
        break;
      case "copy":
        await backupFile(file, pathInto);
        break;
      case "rewrite":
        await deleteFile(
          path.join(pathInto, file.abstractPath, file.name),
        );
        await backupFile(file, pathInto);
    }

    bar.tick();
  }
};