import { Router } from 'express';

import {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const router: Router = Router();

router.post('/', createUser);
router.get('/', listUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
