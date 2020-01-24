import { Router } from 'express';
import validate from 'express-validation';

import * as userControllers from '../controllers/user.controllers';
import validations from '../validations/validations';
// import auth from '../middleware/auth';

const router = Router();

router.post('/sendMail', 
  userControllers.sendMail
);

router.post('/signin',
  validate(validations.signIn),
  userControllers.signIn
);

// router.get('/logout', auth, userControllers.logout);


export default router;