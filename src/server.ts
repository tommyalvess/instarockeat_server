 import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import * as http from 'http';
import * as socketio from 'socket.io';

import routes from './routes';

const uri = "mongodb+srv://tomalves:admin123@cluster0.nfqjfyn.mongodb.net/?retryWrites=true&w=majority";

const app = express()

// Crie uma instância do servidor HTTP
const server = http.createServer(app);
// Crie uma instância do Socket.IO associada ao servidor HTTP
const io = new socketio.Server(server);

mongoose.connect(uri);//Conectando ao banco

// Ouça eventos de conexão
io.on('connection', (socket) => {
    console.log('Um cliente se conectou');
  
    socket.on('mensagem', (mensagem) => {
      console.log(`Mensagem recebida: ${mensagem}`);
      io.emit('mensagem', mensagem); // Enviar a mensagem de volta para todos os clientes
    });
  
    socket.on('disconnect', () => {
      console.log('Um cliente se desconectou');
    });
  });

//uma forma de exportar
// app.use((req: Request, res: Response, next: NextFunction) => {
//     req.io = io;
//     next();
// });

app.use(express.json())
app.use(cors()) //alterar o origin com o seu urls seu dominio

//exportando a pasta para ser acessada
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))
app.use(routes);


server.listen(3333, () => {
    console.log('Servidor está ouvindo na porta 3333');
});

export { io }; // Exporta a instância do Socket.IO
