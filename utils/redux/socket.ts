// socket.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('https://twenty-tools-jam.tunnelapp.dev');

export default socket;
