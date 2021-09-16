import React from "react";

const WebSocketContext = React.createContext<WebSocket | null>(null);

export const WebSocketProvider = WebSocketContext.Provider
export const WebSocketConsumer = WebSocketContext.Consumer

export default WebSocketContext