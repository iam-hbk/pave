// socket.ts
import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://pave-server.onrender.com");
socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});
export default socket;
