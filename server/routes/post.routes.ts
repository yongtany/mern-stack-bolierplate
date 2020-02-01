import { Router } from 'express';
import auth from '../middleware/auth';
import * as postControllers from '../controllers/post.controllers';

const router = Router();

router.post('/uploadThumbnail', auth, postControllers.uploadThumbnail);

router.post('/createPost', auth, postControllers.createPost);

export default router;
