import { getOpts } from "./utils/getOpts.js";
import { checkDirs } from "./validation/checkDirs.js";
import { getFiles } from "./app/getFiles.js";
import { deleteEmptyFolders } from "./app/deleteEmptyFolders.js";
import { sortFiles } from "./app/sortFiles.js";
import { runBackup } from "./app/runBackup.js";
import { saveReport } from "./utils/saveReport.js";
import { getIgnoreFile } from "./utils/getIgnoreFile.js";
import { durationDate, formatDate } from "./utils/formatDate.js";
import { startApiReq, stopApiReq } from "./api/runApiReq.js";

export const main = async () => {
  const startOpts = getOpts();

  const ignore = await getIgnoreFile(startOpts["ignore"]);

  const { pathFrom, pathInto } = await checkDirs({
    pathFrom: startOpts.from,
    pathInto: startOpts.into,
  });

  startApiReq();

  const startDate = new Date();
  console.info(`! Start: ${formatDate(startDate)}`);

  console.info(`# Scanning dir ...`);
  const filesFrom = await getFiles(pathFrom, ignore);
  const filesInto = await getFiles(pathInto, ignore);

  console.info("# Analyzing files ...");
  const checkFiles = await sortFiles(filesFrom, filesInto);

  console.info("# Run backup ...");
  await runBackup(pathInto, checkFiles);

  console.info("# Saving report ...");
  await saveReport(checkFiles);

  if (startOpts["remove-empty-dir"]) {
    console.info("# Start delete empty folders ...");

    await deleteEmptyFolders(pathFrom);
    await deleteEmptyFolders(pathInto);
  }

  stopApiReq();

  console.info("");
  console.info("+ backup is done");

  const endDate = new Date();
  console.info(`! duration: ${durationDate(startDate, endDate)}`);

  console.info("! view report in ./backup-report.json file");
  console.info("! change default ignore in ./ignore.json file");
};