import fs from "node:fs/promises";

export const saveReport = async (files) => {
  await fs.writeFile("./backup-report.json", JSON.stringify(files, null, 2));
};