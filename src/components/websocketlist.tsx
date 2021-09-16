import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { Component, useContext, useEffect, useState } from "react";
import { WebSocketContext } from "./websocketprovider";

export default function WebSocketList() {
    const websocket = useContext(WebSocketContext)

    const [lastMessage, setLastMessage] = useState<any[]>([])

    useEffect(() => {
        if (websocket) {
            websocket.onmessage = (event: MessageEvent) => {
                console.log("got message", event)
                setLastMessage([...lastMessage, event.data])
            }
        }
    })

    return (<List>{lastMessage.map((val, i) => {
        return <ListItem><ListItemText key={i}>{val}</ListItemText></ListItem>
    })}</List>)
}