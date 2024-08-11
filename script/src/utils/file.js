import fs from "node:fs";
import path from "path";

export const backupFile = async (file, toPath) => {
  const destinationDir = path.join(toPath, file.abstractPath);
  const destinationFile = path.join(toPath, file.abstractPath, file.name);

  try {
    await fs.promises.mkdir(destinationDir, { recursive: true });
    await copyFile(file.path, destinationFile);
  } catch (err) {
    console.error("Error backup file:", err);
  }
};

export const deleteFile = async (filePath) => {
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    console.error("Error deleting file:", err);
  }
};

export const copyFile = (source, destination) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);

    readStream.on("error", (error) => reject(error));
    writeStream.on("error", (error) => reject(error));
    writeStream.on("close", () => resolve());
    readStream.pipe(writeStream);
  });
};