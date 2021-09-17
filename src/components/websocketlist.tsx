import { Divider, Grid, List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { Component } from "react";
import WebSocketContext from "../context/websocketcontext";
import { ServerMessage } from "../interfaces/servermessage";
import Chart from "./chart";

class WebSocketList extends Component<{ ws: WebSocket | null }, { messages: ServerMessage[] }>{

    static contextType = WebSocketContext;

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
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
        const data_PT_HE: number[] = []
        const data_PT_Purge: number[] = []
        const data_PT_Pneu: number[] = []
        const data_PT_FUEL_PV: number[] = []
        const data_PT_LOX_PV: number[] = []
        const data_PT_FUEL_INJ: number[] = []
        const data_PT_CHAM: number[] = []
        const data_TC_FUEL_PV: number[] = []
        const data_TC_LOX_PV: number[] = []
        const data_TC_LOX_Valve_Main: number[] = []
        const data_RC_LOX_Level: number[] = []
        const data_FT_Thrust: number[] = []

        this.state.messages.forEach(val=>{
            data_PT_HE.push(val.PT_HE)
            data_PT_Purge.push(val.PT_Purge)
            data_PT_Pneu.push(val.PT_Pneu)
            data_PT_FUEL_PV.push(val.PT_FUEL_PV)
            data_PT_LOX_PV.push(val.PT_LOX_PV)
            data_PT_FUEL_INJ.push(val.PT_FUEL_INJ)
            data_PT_CHAM.push(val.PT_CHAM)
            data_TC_FUEL_PV.push(val.TC_LOX_PV)
            data_TC_LOX_PV.push(val.TC_LOX_PV)
            data_TC_LOX_Valve_Main.push(val.TC_LOX_Valve_Main)
            data_RC_LOX_Level.push(val.RC_LOX_LEVEL)
            data_FT_Thrust.push(val.FT_THRUST)
        })
        return (<Grid container>
            <Grid item xs={6}><Chart data={data_PT_HE} title={"PT_HE"} yaxis={{range:[0, 10], title: "Pressure (PSI)"}}/></Grid>
            {/* <Divider orientation="vertical" flexItem></Divider> */}
            <Grid item xs={6}><Chart data={data_PT_Purge} title={"PT_Purge"} yaxis={{range:[0, 10], title: "Pressure (PSI)"}}/></Grid>
            <Grid item xs={6}><Chart data={data_PT_Pneu} title={"PT_Pneu"} yaxis={{range:[0, 10], title: "Pressure (PSI)"}}/></Grid>
            <Grid item xs={6}><Chart data={data_PT_FUEL_PV} title={"PT_Purge"} yaxis={{range:[0, 10], title: "Pressure (PSI)"}}/></Grid>
            </Grid>)
            
    }
}

export default WebSocketList