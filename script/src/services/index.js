import { CryptoClient } from "../../init.js";
import { exec } from "child_process";

export const getHashReq = (path) => new Promise((resolve, reject) => {
  CryptoClient.GetHash({
    path,
  }, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

export const stopServerReq = () => new Promise((resolve, reject) => {
  CryptoClient.Stop({
    stop: true,
  }, (err, res) => {
    // if (err) reject(err);
    if (err) resolve('ok');
    resolve(res);
  });
});

export const startServerReq = async () => {
  exec("golang.exe", (err, stdout, stderr) => {
    if (err) process.exit(1);
  });

  await new Promise((res, rej) => {
    setTimeout(() => {
      res("");
    }, 2000);
  });
};