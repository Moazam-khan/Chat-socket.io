import { Server } from 'socket.io';
import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};


//Creating a Socket.IO Server:
const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (res.socket && !(res.socket as any).server.io) {
    const httpServer: NetServer = (res.socket as any).server;
    const io = new Server(httpServer, {
      path: '/api/socket',
      addTrailingSlash: false,
    });


    //Storing User Information: object to store usernames associated with their socket IDs.
 

 

    const users: { [key: string]: string } = {};

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('user:join', (userName: string) => {
        users[socket.id] = userName;
        io.emit('user:joined', { id: socket.id, name: userName });
        io.emit('users:update', Object.entries(users).map(([id, name]) => ({ id, name })));
      });

      socket.on('message:send', (message: string) => {
        const userName = users[socket.id];
        if (userName) {
          io.emit('message:received', {
            user: userName,
            content: message,
            timestamp: new Date().toISOString(),
          });
        }
      });

      socket.on('disconnect', () => {
        const userName = users[socket.id];
        delete users[socket.id];
        io.emit('user:left', { id: socket.id, name: userName });
        io.emit('users:update', Object.entries(users).map(([id, name]) => ({ id, name })));
      });
    });

    (res.socket as any).server.io = io;
  }

  res.end();
};

export default ioHandler;
