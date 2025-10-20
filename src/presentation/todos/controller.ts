import { Request, Response } from "express";

export class TodoController {
  // Todo: DI
  constructor() {}

  public getTodos(req: Request, res: Response) {
    res.json([
      {
        id: 1,
        name: "chore 1",
        createdAt: null,
      },
      {
        id: 2,
        name: "chore 2",
        createdAt: new Date(),
      },
    ]);
  }
}
