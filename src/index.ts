import http from "http";
import App from "./app";
const server = http.createServer(App);

const port = 8000;

server.listen(port, () => {
  console.log(`Server ready to serve and running on port ${port}`);
});
