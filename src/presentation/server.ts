import express from "express";
import path from "path";

export class Server {
  private app = express();

  constructor(private publicFolder: string, private port: number) {}

  async start() {
    // middlewares

    //expose  public folder
    this.app.use(express.static(this.publicFolder));

    // catches all requests
    this.app.use((req, res) => {
      console.log({ url: req.url });
      const indexPath = path.join(__dirname, `../../${this.publicFolder}/index.html`);
      console.log(indexPath);
      res.sendFile(indexPath);
    });
    //
    this.app.listen(this.port, () => {
      console.log(`running on port: ${this.port}`);
    });
  }
}
