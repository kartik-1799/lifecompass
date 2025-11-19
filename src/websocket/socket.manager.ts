import { Server } from 'socket.io';

export class SocketManager {
  private io?: Server;

  initialize(server: any) {
    this.io = new Server(server, {
      cors: { origin: '*' },
    });

    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  emit(event: string, data: any) {
    this.io?.emit(event, data);
  }

  emitToUser(userId: string, event: string, data: any) {
    this.io?.to(userId).emit(event, data);
  }
}

export const socketManager = new SocketManager();
