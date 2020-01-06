import { Router } from 'express';
import validate from 'express-validation';

import * as userControllers from '../controllers/user.controllers';
import validations from '../validations/validations';

const router = Router();

router.post('/signup', 
  validate(validations.signUp), 
  userControllers.signUp
);

router.post('/signin',
  validate(validations.signIn),
  userControllers.signIn
)


export default router;