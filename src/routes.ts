import express from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import LikeController from './controllers/LikeController';
import PostController from './controllers/PostController';

const routes = express.Router();
const upload = multer(uploadConfig);

const postController = new PostController()
const likeController = new LikeController()

routes.get('/posts', postController.index)
routes.post('/post', upload.single('image'), postController.create)
routes.post('/post/:id/like', likeController.create)

export default routes;