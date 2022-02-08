import ws from "ws";

export async function openWsServer(port: number): Promise<string> {
  const wss = new ws.Server({ port });
  return new Promise((resolve, reject) => {
    wss.on("listening", () => {
      const address = wss.address();
      if (address) {
        resolve(`${address.address}:${address.port}`);
      } else {
        reject(new Error("ws server address is null"));
      }
    });
    wss.on("error", (err) => {
      reject(err);
    });
  });
}
