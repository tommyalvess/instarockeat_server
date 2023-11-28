import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import PostSchema from '../models/Post';
import { io } from '../server'; // Importa a instância do Socket.IO do módulo separado

export default class PostController {

    async index(req: Request, res: Response){
       try{
        const posts = await PostSchema.find().sort('-createdAt') // o - significa o decrecente
        return res.status(200).send(posts)
       } catch(erro){
        return res.status(400).send('Algo deu errado')
       }
    }

    async create(req: Request, res: Response){ 
        try {
            const {author,place,description,hashtags} = req.body    
            const {filename: image} = req.file  

            const [name] = image.split('.')
            const filename = `${name}.jpg`

            await sharp(req.file?.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file?.destination, 'resized', filename)
            )

            //deletando img q nao foi resized 
            fs.unlinkSync(req.file?.path)

            const creatingPost = await PostSchema.create({
                author,
                place,
                description,
                hashtags,
                image: filename  
            })

            io.emit('post', creatingPost)
        
            return res.status(201).send(creatingPost)
        } catch (error) {
            console.log(error);
            return res.status(400).send('Algo deu errado.')
        }
    }
}
