import { Request, Response } from "express";
import { checkValidDate } from "../../helpers/checkValidDate";

// static todo list
let todos = [
  {
    id: 1,
    name: "chore 1",
    completedAt: null,
  },
  {
    id: 2,
    name: "chore 2",
    completedAt: new Date(),
  },
  {
    id: 3,
    name: "chore 3",
    completedAt: new Date(),
  },
];
export class TodoController {
  // Todo: DI
  constructor() {}

  public getTodos(req: Request, res: Response) {
    return res.json(todos);
  }
  //
  public getTodoById(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json("Invalid id");

    const todo = todos.find((todo) => todo.id === id) ?? null;
    return res
      .status(todo ? 200 : 404)
      .json(todo ?? `Todo with id '${id}' was not found`);
  }
  //
  public saveNewTodo(req: Request, res: Response) {
    const { name = null } = req.body;
    if (!name) return res.status(400).json({ message: "invalid data" });
    // create new todo....
    const newTodo = {
      id: todos.length + 1,
      name: name as string,
      completedAt: new Date(),
    };
    todos.push(newTodo);
    return res.status(201).json({ todo: newTodo });
  }
  //
  public updateTodoById(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json("Invalid id");

    const { name = null, completedAt = null } = req.body;
    if (!name && !completedAt)
      return res.status(400).json({ message: "Missing properties" });

    const todo = todos.find((todo) => todo.id === id) ?? null;
    if (!todo)
      return res
        .status(404)
        .json({ message: `Todo with id: '${id}' was not found` });

    // updates the reference in memory for the example
    todo.name = name ?? todo.name;
    if (completedAt && checkValidDate(completedAt)) {
      todo.completedAt = new Date(completedAt);
    }

    return res.status(200).json({
      message: "updated",
      todo,
    });
  }
  //
  public deleteTodoById(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    //
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json({ message: "Todo does not exist" });
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    todos = updatedTodos;
    return res.status(200).json({ message: "Todo deleted", todo });
  }
}
