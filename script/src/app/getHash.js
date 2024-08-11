import { getHashReq } from "../api/getHashReq.js";

export const getHash = async (driveRes) => {
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
}