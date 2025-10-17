import { existsSync, readFileSync } from "fs";
import http from "http";
import { join } from "path";
// import http from "http2";
// import http from "https";

const server = http.createServer((req, res) => {
  console.log({ url: req.url });
  // res.writeHead(200, { "content-type": "text/html"});
  // res.write(`<h1>This is the requested Url: ${req.url}</h1>`);
  // res.end();

  //   const data = {name: "diego", age: 24, city: "cucuta"};
  //   res.writeHead(200, {"content-type": "application/json"});
  //   res.end(JSON.stringify(data)); //res.write and res.end at the same time

  if (req.url?.endsWith(".css") || req.url?.endsWith(".js") ) {
    const filePath = join("public", req.url);
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, { encoding: "utf8" });
      res.writeHead(200, { "content-type": req.url?.endsWith(".css") ? "text/css" : "application/javascript"});
      res.end(content);
    } else {
      res.statusCode = 404;
      res.end();
    }
    return;
  }
  if (req.url === "/") {
    const htmlFile = readFileSync("./public/index.html", { encoding: "utf8" });
    res.writeHead(200, { "content-type": "text/html" });
    res.end(htmlFile); //res.write and res.end at the same time
    return;
  }
  // default not found
  res.writeHead(404, { "content-type": "text/html" });
  res.end(`<h1>404 not found</h1>`); //res.write and res.end at the same time
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});
