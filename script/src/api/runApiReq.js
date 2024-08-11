import axios from "axios";
import { exec } from "child_process";

export const startApiReq = () => {
  exec("api.exe", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

export const stopApiReq = () => {
  axios({
    url: "http://127.0.0.1:3000/stop",
    method: "get",
  }).then().catch(err => err);
};