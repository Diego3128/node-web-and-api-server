import express from "express";
import path from "path";

export class Server {
  private app = express();

  async start() {
    // middlewares

    //expose  public folder
    this.app.use(express.static("public"));

    // catches all requests
    this.app.use((req, res) => {
      console.log({ url: req.url });
      const indexPath = path.join(__dirname, "../../public/index.html");
      res.sendFile(indexPath);
    });
    //

    this.app.listen(3000, () => {
      console.log("started 3000");
    });
  }
}
