import { Router } from 'express';
import auth from '../middleware/auth';
import * as postControllers from '../controllers/post.controllers';

const router = Router();

router.post('/upload', auth, postControllers.upload);

router.post('/createPost', auth, postControllers.createPost);

router.get('/:id', postControllers.getPostById);

export default router;
