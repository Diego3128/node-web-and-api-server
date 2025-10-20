import express from "express";
import path from "path";
import { AppRoutes } from "./routes";
export class Server {
  private app = express();

  constructor(private publicFolder: string, private port: number) {}
  async start() {
    // middlewares
    // api routes
    const routes = AppRoutes.routes;
    this.app.use(routes);
    //expose  public folder
    this.app.use(express.static(this.publicFolder));
    // catches all requests
    this.app.use((req, res) => {
      // serves the public/index.html file when a route is not found
      console.log({ url: req.url });
      const indexPath = path.join(
        __dirname,
        `../../${this.publicFolder}/index.html`
      );
      console.log(indexPath);
      res.sendFile(indexPath);
    });
    //
    this.app.listen(this.port, () => {
      console.log(`running on port: ${this.port}`);
    });
  }
}
