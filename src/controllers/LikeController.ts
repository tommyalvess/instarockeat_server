import { Request, Response } from 'express';
import PostSchema from '../models/Post';
import { io } from '../server'; // Importa a instância do Socket.IO do módulo separado

export default class LikeController {

    async create(req: Request, res: Response){ 
        const post = await PostSchema.findById(req.params.id)

        if (post) {
            post?.likes += 1;

            await post?.save()

            io.emit('like', post)

            return res.status(201).send(post)
        } 

        return res.status(400).send('Post não foi localizado.')        
    }
}
