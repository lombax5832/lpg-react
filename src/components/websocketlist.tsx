import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { Component } from "react";
import WebSocketContext from "../context/websocketcontext";
import { ServerMessage } from "../interfaces/servermessage";
import Chart from "./chart";

class WebSocketList extends Component<{ ws: WebSocket | null }, { messages: ServerMessage[], ws: WebSocket | null }>{

    static contextType = WebSocketContext;

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            ws: this.props.ws
        }
    }

    componentDidUpdate() {
        if (this.props.ws && !this.props.ws.onmessage) {
            this.props.ws.onmessage = (event: MessageEvent) => {
                console.log("got message", event)
                this.setState({ messages: [...this.state.messages, JSON.parse(event.data)] })
            }
        }
    }

    render() {
        return (<><List>
            <ListSubheader inset>Data from websocket</ListSubheader>
            {this.state.messages.map((val, i) => {
                return <ListItem key={i}><ListItemText>{`${i}: ${JSON.stringify(val)}`}</ListItemText></ListItem>
            })}</List>
            <Chart /></>)
    }
}

export default WebSocketList