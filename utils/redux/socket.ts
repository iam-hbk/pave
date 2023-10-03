// socket.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('https://179c-169-1-232-146.ngrok-free.app');
socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });
export default socket;
