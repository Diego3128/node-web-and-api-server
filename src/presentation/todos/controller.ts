import { Request, Response } from "express";
import { checkValidDate } from "../../helpers/checkValidDate";
import prisma from "../../config/prisma";
import { CreateTodoDTO } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo-dto";

// static todo list

export class TodoController {
  // Todo: DI
  constructor() { }

  public async getTodos(req: Request, res: Response) {
    const todos = await prisma.todo.findMany({});
    return res.status(200).json({ todos });
  }
  //
  public async getTodoById(req: Request, res: Response) {
    const id = req.params.id;
    if (id.length < 10) return res.status(400).json("Invalid id");

    const todo = await prisma.todo.findUnique({ where: { id } })
    return res
      .status(todo ? 200 : 404)
      .json(todo ?? `Todo with id '${id}' was not found`);
  }
  //
  public async saveNewTodo(req: Request, res: Response) {
    const [error, TodoDTO] = CreateTodoDTO.create(req.body);
    if (error) return res.status(400).json({ message: error });
    // create new todo....
    const newTodo = await prisma.todo.create({ data: TodoDTO! });
    return res.status(201).json({ todo: newTodo });
  }
  //
  public async updateTodoById(req: Request, res: Response) {
    const id = req.params.id;
    const [error, TodoDto] = UpdateTodoDto.update({ id, ...req.body });
    console.log({ error, TodoDto })
    if (error) {
      return res
        .status(400)
        .json({ error });
    }
    const todo = await prisma.todo.findUnique({ where: { id: TodoDto?.id } });

    if (!todo)
      return res
        .status(404)
        .json({ message: `Todo with id: '${id}' was not found` });

    // update todo
    const updatedTodo = await prisma.todo.update({
      where: { id: TodoDto?.id! },
      data: {
        ...TodoDto
      }
    })

    return res
      .status(200)
      .json({ message: 'Todo updated', updatedTodo })
  }
  //
  public async deleteTodoById(req: Request, res: Response) {
    const id = req.params.id;
    if (id.length < 10) return res.status(400).json("Invalid id");
    //
    const todo = await prisma.todo.findUnique({ where: { id } })
    if (!todo) return res.status(404).json({ message: "Todo does not exist" });
    const deletedTodo = await prisma.todo.delete({ where: { id } });
    return res.status(200).json({ message: "Todo deleted", todo: deletedTodo });
  }
}
