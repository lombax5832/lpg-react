import { Typography } from "@material-ui/core";
import { Component, useContext, useEffect, useState } from "react";
import { WebSocketContext } from "./websocketprovider";

export default function WebSocketList() {
    const websocket = useContext(WebSocketContext)

    const [lastMessage, setLastMessage] = useState<any>(null)

    useEffect(() => {
        if (!websocket?.onmessage) {
            console.log("onmessage does not exist yet")
            if (websocket) {
                websocket.onmessage = (event) => {
                    setLastMessage(event)
                }
            }
        }
    })

    return (<Typography>{lastMessage}</Typography>)
}