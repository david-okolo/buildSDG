import express from 'express';

import registerController from './register.controller';

const router = express.Router();

router.post('/', registerController.registerUser);

export default router;
