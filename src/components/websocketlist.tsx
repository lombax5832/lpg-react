import { Grid } from "@material-ui/core";
import { Component } from "react";
import WebSocketContext from "../context/websocketcontext";
import Chart from "./chart";

interface IData {
    PT_HE: number[]
    PT_Purge: number[]
    PT_Pneu: number[]
    PT_FUEL_PV: number[]
    PT_LOX_PV: number[]
    //PT_FUEL_INJ: number[]
    PT_CHAM: number[]
    TC_FUEL_PV: number[]
    TC_LOX_PV: number[]
    TC_LOX_Valve_Main: number[]
    TC_WATER_In: number[]
    TC_WATER_Out: number[]
    TC_CHAM: number[]
    //RC_LOX_Level: number[]
    FT_Thrust: number[]
    FL_WATER: number[]
}

class WebSocketList extends Component<{ ws: WebSocket | null }, { data: IData, timeout: { status: Boolean } }>{

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
                //PT_FUEL_INJ: [],
                PT_CHAM: [],
                TC_FUEL_PV: [],
                TC_LOX_PV: [],
                TC_LOX_Valve_Main: [],
                TC_WATER_In: [],
                TC_WATER_Out: [],
                TC_CHAM: [],
                //RC_LOX_Level: [],
                FT_Thrust: [],
                FL_WATER: []
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

    /*
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
    }*/

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
            this.makeTimeout(50);
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
                let data: IData = {
                    PT_HE: [],
                    PT_Purge: [],
                    PT_Pneu: [],
                    PT_FUEL_PV: [],
                    PT_LOX_PV: [],
                    //PT_FUEL_INJ: [],
                    PT_CHAM: [],
                    TC_FUEL_PV: [],
                    TC_LOX_PV: [],
                    TC_LOX_Valve_Main: [],
                    TC_WATER_In: [],
                    TC_WATER_Out: [],
                    TC_CHAM: [],
                    //RC_LOX_Level: [],
                    FT_Thrust: [],
                    FL_WATER: []
                }
                item.message.forEach((val, i) => {
                    console.log(i)
                    data = {
                        PT_HE: [...data.PT_HE, val.PT_HE],
                        PT_Purge: [...data.PT_Purge, val.PT_Purge],
                        PT_Pneu: [...data.PT_Pneu, val.PT_Pneu],
                        PT_FUEL_PV: [...data.PT_FUEL_PV, val.PT_FUEL_PV],
                        PT_LOX_PV: [...data.PT_LOX_PV, val.PT_LOX_PV],
                        //PT_FUEL_INJ: [...data.PT_FUEL_INJ, val.PT_FUEL_INJ],
                        PT_CHAM: [...data.PT_CHAM, val.PT_CHAM],
                        TC_FUEL_PV: [...data.TC_FUEL_PV, val.TC_FUEL_PV],
                        TC_LOX_PV: [...data.TC_LOX_PV, val.TC_LOX_PV],
                        TC_LOX_Valve_Main: [...data.TC_LOX_Valve_Main, val.TC_LOX_Valve_Main],
                        TC_WATER_In: [...data.TC_WATER_In, val.TC_WATER_In],
                        TC_WATER_Out: [...data.TC_WATER_Out, val.TC_WATER_Out],
                        TC_CHAM: [...data.TC_CHAM, val.TC_CHAM],
                        //RC_LOX_Level: [...data.RC_LOX_Level, val.RC_LOX_Level],
                        FT_Thrust: [...data.FT_Thrust, val.FT_Thrust],
                        FL_WATER: [...data.FL_WATER, val.FL_WATER]
                    }
                })
                console.log(data.PT_HE.length)
                this.setState({
                    data: {
                        PT_HE: [...this.state.data.PT_HE, ...data.PT_HE],
                        PT_Purge: [...this.state.data.PT_Purge, ...data.PT_Purge],
                        PT_Pneu: [...this.state.data.PT_Pneu, ...data.PT_Pneu],
                        PT_FUEL_PV: [...this.state.data.PT_FUEL_PV, ...data.PT_FUEL_PV],
                        PT_LOX_PV: [...this.state.data.PT_LOX_PV, ...data.PT_LOX_PV],
                        //PT_FUEL_INJ: [...this.state.data.PT_FUEL_INJ, ...data.PT_FUEL_INJ],
                        PT_CHAM: [...this.state.data.PT_CHAM, ...data.PT_CHAM],
                        TC_FUEL_PV: [...this.state.data.TC_FUEL_PV, ...data.TC_FUEL_PV],
                        TC_LOX_PV: [...this.state.data.TC_LOX_PV, ...data.TC_LOX_PV],
                        TC_LOX_Valve_Main: [...this.state.data.TC_LOX_Valve_Main, ...data.TC_LOX_Valve_Main],
                        TC_WATER_In: [...this.state.data.TC_WATER_In, ...data.TC_WATER_In],
                        TC_WATER_Out: [...this.state.data.TC_WATER_Out, ...data.TC_WATER_Out],
                        TC_CHAM: [...this.state.data.TC_CHAM, ...data.TC_CHAM],
                        //RC_LOX_Level: [...this.state.data.RC_LOX_Level, ...data.RC_LOX_Level],
                        FT_Thrust: [...this.state.data.FT_Thrust, ...data.FT_Thrust],
                        FL_WATER: [...this.state.data.FL_WATER, ...data.FL_WATER]
                    }
                })
            }
        }
    }

    render() {

        return (<Grid container>
            <Grid item xs={3}><Chart data={this.state.data.PT_HE} title={"PT_HE"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.PT_Purge} title={"PT_Purge"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.PT_Pneu} title={"PT_Pneu"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.PT_FUEL_PV} title={"PT_FUEL_PV"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.PT_LOX_PV} title={"PT_LOX_PV"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            {/*<Grid item xs={3}><Chart data={this.state.data.PT_FUEL_INJ} title={"PT_FUEL_INJ"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>*/}
            <Grid item xs={3}><Chart data={this.state.data.PT_CHAM} title={"PT_CHAM"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.TC_FUEL_PV} title={"TC_FUEL_PV"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.TC_LOX_PV} title={"TC_LOX_PV"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.TC_LOX_Valve_Main} title={"TC_LOX_Valve_Main"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.TC_WATER_In} title={"TC_WATER_In"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.TC_WATER_Out} title={"TC_WATER_Out"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.TC_CHAM} title={"TC_CHAM"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            {/*<Grid item xs={3}><Chart data={this.state.data.RC_LOX_Level} title={"RC_LOX_Level"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>*/}
            <Grid item xs={3}><Chart data={this.state.data.FT_Thrust} title={"FT_Thrust"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.FL_WATER} title={"FL_WATER"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
        </Grid>)

    }
}

export default WebSocketList