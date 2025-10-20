import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/todos", TodoRoutes.routes);
    // router.use("/api/v1/products", ProductRoutes.routes);

    return router;
  }
}
