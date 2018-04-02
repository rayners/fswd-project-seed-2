import express from 'express';
import index from './routes/index';
import users from './routes/users';

const router = express.Router();

router.use('/', index);
router.use('/users', users);

export default router;