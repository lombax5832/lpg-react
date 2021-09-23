import { Component } from "react";
import WebSocketContext from "../context/websocketcontext";
import Chart from "./chart";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!../worker/worker'
import { IData } from "../interfaces/data";
import { Box, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

class WebSocketList extends Component<{}, { data: IData, timeout: { status: Boolean }, tab: string }>{


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
            },
            tab: '0'
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
            this.makeTimeout(200);
            return false
        }
        //If some other property changed, we can update normally for it here
        else if (this.state.timeout.status == false) {
            return true
        }

        return false
    }

    componentDidMount() {
        const worker = new Worker()
        worker.postMessage("HEY")
        worker.addEventListener('message', (ev) => {
            // console.log("MESSAGE RECEIVED:", ev)
            let data = JSON.parse(ev.data)
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
        })
        console.log("SENT MESSAGE")
    }

    componentDidUpdate() {
        console.log("rerender");

    }

    render() {

        return (<>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={this.state.tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(event, newval) => { this.setState({ tab: newval }) }} aria-label="lab API tabs example">
                            <Tab label="Item One" value="1" />
                            <Tab label="Item Two" value="2" />
                            <Tab label="Item Three" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
            <Grid container>
                <Grid item xs={3}><Chart data={this.state.data.PT_HE} title={"PT_HE"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                <Grid item xs={3}><Chart data={this.state.data.PT_Purge} title={"PT_Purge"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                <Grid item xs={3}><Chart data={this.state.data.PT_Pneu} title={"PT_Pneu"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                <Grid item xs={3}><Chart data={this.state.data.PT_FUEL_PV} title={"PT_FUEL_PV"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                {/* <Grid item xs={3}><Chart data={this.state.data.PT_LOX_PV} title={"PT_LOX_PV"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            {/*<Grid item xs={3}><Chart data={this.state.data.PT_FUEL_INJ} title={"PT_FUEL_INJ"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>*/}
                {/* <Grid item xs={3}><Chart data={this.state.data.PT_CHAM} title={"PT_CHAM"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.TC_FUEL_PV} title={"TC_FUEL_PV"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.TC_LOX_PV} title={"TC_LOX_PV"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.TC_LOX_Valve_Main} title={"TC_LOX_Valve_Main"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.TC_WATER_In} title={"TC_WATER_In"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
            <Grid item xs={3}><Chart data={this.state.data.TC_WATER_Out} title={"TC_WATER_Out"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid> */}
                {/* <Grid item xs={3}><Chart data={this.state.data.TC_CHAM} title={"TC_CHAM"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid> */}
                {/*<Grid item xs={3}><Chart data={this.state.data.RC_LOX_Level} title={"RC_LOX_Level"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>*/}
                {/* <Grid item xs={3}><Chart data={this.state.data.FT_Thrust} title={"FT_Thrust"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid> */}
                {/* <Grid item xs={3}><Chart data={this.state.data.FL_WATER} title={"FL_WATER"} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid> */}
            </Grid></>)

    }
}

export default WebSocketList