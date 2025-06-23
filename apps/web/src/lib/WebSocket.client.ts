let socket: WebSocket | null = null;

export const getWebSocket = () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    const port = process.env.NEXT_PUBLIC_WEBSOCKET_PORT;
    socket = new WebSocket(`ws://localhost:${port}`);
  }
  return socket;
};
