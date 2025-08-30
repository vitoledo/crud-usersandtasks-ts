import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(['pending', 'em andamento', 'finalizado']).default('pending'),
  userId: z.string(),
});

export type Task = z.infer<typeof taskSchema> & {
  id?: string;
  createDate?: Date;
  updateDate?: Date;
};
