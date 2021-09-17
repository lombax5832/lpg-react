import { Divider, Grid, List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { Component } from "react";
import WebSocketContext from "../context/websocketcontext";
import { ServerMessage } from "../interfaces/servermessage";
import Chart from "./chart";

interface Data {
    PT_HE: number[]
    PT_Purge: number[]
    PT_Pneu: number[]
    PT_FUEL_PV: number[]
    PT_LOX_PV: number[]
    PT_FUEL_INJ: number[]
    PT_CHAM: number[]
    TC_FUEL_PV: number[]
    TC_LOX_PV: number[]
    TC_LOX_Valve_Main: number[]
    RC_LOX_Level: number[]
    FT_Thrust: number[]
}

class WebSocketList extends Component<{ ws: WebSocket | null }, { data: Data }>{

    static contextType = WebSocketContext;

    constructor(props) {
        super(props);

        this.state = {
            data: {
                PT_HE: [],
                PT_Purge: [],
                PT_Pneu: [],
                PT_FUEL_PV: [],
                PT_LOX_PV: [],
                PT_FUEL_INJ: [],
                PT_CHAM: [],
                TC_FUEL_PV: [],
                TC_LOX_PV: [],
                TC_LOX_Valve_Main: [],
                RC_LOX_Level: [],
                FT_Thrust: [],
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.data.PT_HE.length % 20 !== 0)
            return false
        return true
    }

    componentDidUpdate() {
        if (this.props.ws && !this.props.ws.onmessage) {
            this.props.ws.onmessage = (event: MessageEvent) => {
                console.log("got message", event)
                let item = JSON.parse(event.data)
                this.setState({
                    data: {
                        PT_HE: [...this.state.data.PT_HE, item.PT_HE],
                        PT_Purge: [...this.state.data.PT_Purge, item.PT_Purge],
                        PT_Pneu: [...this.state.data.PT_Pneu, item.PT_Pneu],
                        PT_FUEL_PV: [...this.state.data.PT_FUEL_PV, item.PT_FUEL_PV],
                        PT_LOX_PV: [...this.state.data.PT_LOX_PV, item.PT_LOX_PV],
                        PT_FUEL_INJ: [...this.state.data.PT_FUEL_INJ, item.PT_FUEL_INJ],
                        PT_CHAM: [...this.state.data.PT_CHAM, item.PT_CHAM],
                        TC_FUEL_PV: [...this.state.data.TC_FUEL_PV, item.TC_FUEL_PV],
                        TC_LOX_PV: [...this.state.data.TC_LOX_PV, item.TC_LOX_PV],
                        TC_LOX_Valve_Main: [...this.state.data.TC_LOX_Valve_Main, item.TC_LOX_Valve_Main],
                        RC_LOX_Level: [...this.state.data.RC_LOX_Level, item.RC_LOX_Level],
                        FT_Thrust: [...this.state.data.FT_Thrust, item.FT_Thrust],
                    }
                })
            }
        }
    }

    render() {

        return (<Grid container>
            <Grid item xs={6}><Chart data={this.state.data.PT_HE} title={"PT_HE"} yaxis={{ range: [0, 10], title: "Pressure (PSI)" }} /></Grid>
            {/* <Divider orientation="vertical" flexItem></Divider> */}
            <Grid item xs={6}><Chart data={this.state.data.PT_Purge} title={"PT_Purge"} yaxis={{ range: [0, 10], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={6}><Chart data={this.state.data.PT_Pneu} title={"PT_Pneu"} yaxis={{ range: [0, 10], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={6}><Chart data={this.state.data.PT_FUEL_PV} title={"PT_Purge"} yaxis={{ range: [0, 10], title: "Pressure (PSI)" }} /></Grid>
        </Grid>)

    }
}

export default WebSocketList