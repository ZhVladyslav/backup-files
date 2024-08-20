import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { main } from "./src/main.js";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync("../api/crypto.proto", options);
const CryptoService = grpc.loadPackageDefinition(packageDefinition).review?.Crypto;

if (!CryptoService) {
  console.error("CryptoService is undefined. Check your proto file and package paths.");
  process.exit(1);
}

export const CryptoClient = new CryptoService(
  "127.0.0.1:8089",
  grpc.credentials.createInsecure()
);

main();