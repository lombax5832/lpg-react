import { Grid } from "@material-ui/core";
import { Component } from "react";
import WebSocketContext from "../context/websocketcontext";
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

class WebSocketList extends Component<{ ws: WebSocket | null }, { data: Data, timeout: { status: Boolean } }>{

    static contextType = WebSocketContext;

    constructor(props) {
        super(props);

        this.state = {
            timeout: {
                status: false
            },
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

    /**
     * 
     * Utility function to help prevent rendering excessively
     * 
     * @param time time in milliseconds to set the timeout for
     * @returns void
     */
    makeTimeout(time: number) {
        this.setState({ timeout: { status: true } })

        let timeout = setTimeout(() => {
            this.forceUpdate();
            this.setState({ timeout: { status: false } })
        }, time);
        return timeout
    }

    addData = (message) => {
        this.setState({
            data: {
                PT_HE: [...this.state.data.PT_HE, message.PT_HE],
                PT_Purge: [...this.state.data.PT_Purge, message.PT_Purge],
                PT_Pneu: [...this.state.data.PT_Pneu, message.PT_Pneu],
                PT_FUEL_PV: [...this.state.data.PT_FUEL_PV, message.PT_FUEL_PV],
                PT_LOX_PV: [...this.state.data.PT_LOX_PV, message.PT_LOX_PV],
                PT_FUEL_INJ: [...this.state.data.PT_FUEL_INJ, message.PT_FUEL_INJ],
                PT_CHAM: [...this.state.data.PT_CHAM, message.PT_CHAM],
                TC_FUEL_PV: [...this.state.data.TC_FUEL_PV, message.TC_FUEL_PV],
                TC_LOX_PV: [...this.state.data.TC_LOX_PV, message.TC_LOX_PV],
                TC_LOX_Valve_Main: [...this.state.data.TC_LOX_Valve_Main, message.TC_LOX_Valve_Main],
                RC_LOX_Level: [...this.state.data.RC_LOX_Level, message.RC_LOX_Level],
                FT_Thrust: [...this.state.data.FT_Thrust, message.FT_Thrust],
            }
        })
    }

    /**
     * 
     * Makes sure that the component isn't queuing renders faster than it can finish rendering
     */
    shouldComponentUpdate(nextProps, nextState) {
        //We want to update if the timeout status is changing
        if (this.state.timeout.status != nextState.timeout.status) {
            return true
        }
        //If there isn't an active timeout and the length of the data set is changed,
        //we can update in 10 milliseconds while refusing to update naturally
        if (this.state.timeout.status == false && this.state.data.PT_HE.length != nextState.data.PT_HE.length) {
            this.makeTimeout(100);
            return false
        }
        //If some other property changed, we can update normally for it here
        else if (this.state.timeout.status == false) {
            return true
        }

        return false
    }



    componentDidUpdate() {
        console.log("rerender");
        if (this.props.ws && !this.props.ws.onmessage) {
            this.props.ws.onmessage = (event: MessageEvent) => {
                let item = JSON.parse(event.data)
                item.message.forEach(this.addData)
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