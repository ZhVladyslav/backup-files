export const sortFiles = async (filesFrom, filesInto) => {
  const checkFiles = []

  for (const fileFrom of filesFrom) {
    let isExist = false;

    if (fileFrom.size === 0) {
      checkFiles.push({ ...fileFrom, action: 'delete-from' });
      continue;
    }

    for (const fileInto of filesInto) {
      if (fileFrom.abstractPath === fileInto.abstractPath) {
        if (fileFrom.name === fileInto.name) {
          if (fileFrom.hash !== fileInto.hash)
            checkFiles.push({ ...fileFrom, action: 'rewrite' });

          isExist = true;
          break;
        }
      }
    }

    if (!isExist) checkFiles.push({ ...fileFrom, action: 'copy' });
  }

  for (const fileInto of filesInto) {
    let isExist = false;

    for (const fileFrom of filesFrom) {
      if (fileFrom.size === 0) continue;

      if (fileInto.abstractPath === fileFrom.abstractPath)
        if (fileInto.name === fileFrom.name) {
          isExist = true;
          break;
        }
    }

    if (!isExist) checkFiles.push({ ...fileInto, action: 'delete-into' });
  }

  return checkFiles
}