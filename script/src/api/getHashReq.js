import axios from "axios";

export const getHashReq = async (filePath) => {
  try {
    const res = await axios({
      url: "http://127.0.0.1:3000",
      method: "post",
      data: filePath,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};