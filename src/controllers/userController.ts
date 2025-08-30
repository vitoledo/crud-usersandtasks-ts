import { users } from '../data/users';
import { tasks } from '../data/tasks';
import { userSchema } from '../schemas/userSchema';
import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';

//POST
export const createUser = (req: Request, res: Response) => {
  try {
    const data = userSchema.parse(req.body);
    const emailExist = users.some((u) => u.email === data.email);

    if (emailExist) {
      return res.status(400).json({ error: 'Email já cadastrado!' });
    }

    const newUser = {
      id: randomUUID(),
      ...data,
      createDate: new Date(),
      updateDate: new Date(),
    };

    users.push(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err });
    }
  }
};

//GET
export const listUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(400).json({ error: 'Usuário inexistente!' });
  }

  res.json(user);
};

//PUT
export const updateUser = (req: Request, res: Response) => {
  try {
    const data = userSchema.parse(req.body);
    const { id } = req.params;
    const user = users.find((u) => u.id === id);
    const userIndex = users.findIndex((u) => u.id === id);

    if (!user) {
      return res.status(400).json({ error: 'Usuário inexistente!' });
    }

    const emailExist = users.some((u) => u.email === data.email && u.id !== id);
    if (emailExist) {
      return res.status(400).json({ error: 'Email já cadastrado!' });
    }

    const updateUser = {
      ...users[userIndex],
      ...data,
      updateDate: new Date(),
    };

    users[userIndex] = updateUser;
    res.status(201).json(updateUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err });
    }
  }
};

//DELETE
export const deleteUser = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = users.find((u) => u.id === id);
    const task = tasks.find((t) => t.userId === id);
    const userIndex = users.findIndex((u) => u.id === id);

    if (!user) {
      return res.status(400).json({ error: 'Usuário inexistente!' });
    }

    if (!task) {
      users.splice(userIndex, 1);

      res
        .status(201)
        .json({ message: 'Usuário deletado e usuário não tinha tasks!' });
    } else {
      const taskIndex = tasks.findIndex((t) => t.userId === id);

      users.splice(userIndex, 1);

      for (let i = tasks.length - 1; i >= 0; i--) {
        const task = tasks[i];

        if (task && task.userId === id) {
          tasks.splice(i, 1);
        }
      }

      res.status(201).json({ message: 'Usuário e tasks deletados!' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err });
    }
  }
};
