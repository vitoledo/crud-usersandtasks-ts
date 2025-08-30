import { users } from '../data/users';
import { tasks } from '../data/tasks';
import { taskSchema } from '../schemas/taskSchema';
import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';

//POST
export const createTask = (req: Request, res: Response) => {
  try {
    const data = taskSchema.parse(req.body);
    const user = users.find((u) => u.id === data.userId);

    if (user === undefined) {
      return res.status(400).json({ error: 'Usuário inexistente!' });
    }

    if (user.status === 'ativo') {
      const newTask = {
        id: randomUUID(),
        ...data,
        createDate: new Date(),
        updateDate: new Date(),
      };

      tasks.push(newTask);
      res.status(201).json(newTask);
    } else {
      return res.status(400).json({ error: 'Usuário inativo!' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err });
    }
  }
};

//GET
export const listTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const getTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(400).json({ error: 'Task inexistente!' });
  }

  res.json(task);
};

export const getTaskByUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  const userTasks = tasks.filter((t) => t.userId === userId);

  if (userTasks.length === 0) {
    return res.status(400).json({ error: 'Task inexistente!' });
  }

  res.json(userTasks);
};

//PUT
export const updateTask = (req: Request, res: Response) => {
  try {
    const data = taskSchema.parse(req.body);
    const { id } = req.params;
    const task = tasks.find((t) => t.id === id);
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (!task) {
      res.status(400).json({ error: 'Task inexistente!' });
    }

    const updateTasks = {
      ...tasks[taskIndex],
      ...data,
      updateDate: new Date(),
    };

    tasks[taskIndex] = updateTasks;
    res.status(201).json(updateTasks);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err });
    }
  }
};

//DELETE
export const deleteTask = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = tasks.find((t) => t.id === id);
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (!task) {
      return res.status(400).json({ error: 'Task inexistente!' });
    }

    tasks.splice(taskIndex, 1);

    res.status(201).json({ message: 'Task deletada!' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err });
    }
  }
};
