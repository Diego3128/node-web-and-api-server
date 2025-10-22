import { Router } from "express";
import { TodoController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const todoController = new TodoController();

    router.get("/", todoController.getTodos );

    router.get("/:id", todoController.getTodoById);

    router.post("/", todoController.saveNewTodo );

    router.put("/:id", todoController.updateTodoById);

    router.delete("/:id", todoController.deleteTodoById);

    return router;
  }
}
