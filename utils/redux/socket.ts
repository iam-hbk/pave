// socket.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000');
socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });
export default socket;
