import { useEffect, DependencyList } from "react";
import { Socket } from "socket.io-client";
import socket from "../utils/redux/socket";

type EventCallback = (...args: any[]) => void;

const useSocket = (event: string, callback: EventCallback) => {
  useEffect(() => {
    // Add event listener for 'event' on mount
    socket.on(event, callback);

    // Handle connection errors
    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Remove event listener on unmount
    return () => {
      socket.off(event, callback);
      socket.off("connect_error");
    };
  }, [event, callback]);
};

export default useSocket;
