import stdio from "stdio";

export const getOpts = () => {
  const ops = stdio.getopt({
    "from": { key: "f", description: "Path to the file from which to copy", args: 1, required: true },
    "into": { key: "into", description: "Path to the file to which to copy", args: 1, required: true },

    "ignore": { key: "i", description: "Path to config ignore file", args: 1 },

    "remove-empty-dir": { key: "rmdir", description: "Remove empty dirs" },
    // "remove-files": { key: "rm", description: "Remove empty files" },
  });

  return ops;
};
