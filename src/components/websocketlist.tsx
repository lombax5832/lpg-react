import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Divider, FormControlLabel, FormGroup, Grid, Slider, Stack, Switch, Tab } from "@mui/material";
import { Component } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!../worker/worker';
import WebSocketContext from "../context/websocketcontext";
import { IData } from "../interfaces/data";
import { ButtonState } from "../interfaces/buttonstate";
import ButtonGrid from "./buttongrid";
import Chart from "./chart";
import Diagram from "./diagram";

class WebSocketList extends Component<{}, { data: IData, range: { follow: boolean, value: number[] }, timeout: { status: Boolean }, tab: string, buttonState: ButtonState }>{


    static contextType = WebSocketContext;

    constructor(props) {
        super(props);

        this.state = {
            timeout: {
                status: false
            },
            range: { follow: true, value: [0, 3] },
            data: {
                Timestamp: [],
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
            buttonState: {
                Timestamp: 0,
                FUEL_Press: true,
                LOX_Press: false,
                FUEL_Vent: true,
                LOX_Vent: true,
                MAIN: false,
                FUEL_Purge: false,
                LOX_Purge: false
            },
            tab: '1'
        }
    }

    componentDidMount() {
        const worker = new Worker()
        worker.postMessage("HEY")
        worker.addEventListener('message', (ev) => {
            console.log("MESSAGE RECEIVED:", ev)
            let data = JSON.parse(ev.data)
            if (data.PT_HE) {

                let newRange = this.state.range
                if (newRange.follow) {
                    newRange.value = [Math.max(this.state.data.Timestamp[this.state.data.Timestamp.length - 1] - 3, 0), Math.max(this.state.data.Timestamp[this.state.data.Timestamp.length - 1], 3)]
                }
                this.setState({
                    range: newRange,
                    data: {
                        Timestamp: [...this.state.data.Timestamp, ...data.Timestamp],
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
            } else if (data.FUEL_Press) {
                this.setState({
                    buttonState: {
                        Timestamp: data.Timestamp,
                        FUEL_Press: data.FUEL_Press == 48 ? false : true, //CURSED
                        LOX_Press: data.LOX_Press == 48 ? false : true, //CURSED
                        FUEL_Vent: data.FUEL_Vent == 48 ? false : true, //VERY CURSED
                        LOX_Vent: data.LOX_Vent == 48 ? false : true,  //UNHOLY
                        MAIN: data.MAIN == 48 ? false : true, //EVIL TERNARY OPERATOR HACK
                        FUEL_Purge: data.FUEL_Purge == 48 ? false : true,  //NOT GOOD
                        LOX_Purge: data.LOX_Purge == 48 ? false : true  //BAD
                    }
                })
                console.log(ev)
            }
        })
        console.log("SENT MESSAGE")
    }

    componentDidUpdate() {
    }

    render() {

        return (<>
            <Grid container >
                <Grid container item xs={9} >
                    <Box sx={{ width: '100%', typography: 'body1' }} style={{ padding: 0 }}>
                        <TabContext value={this.state.tab}>
                            <Grid container item>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                                    <TabList variant='fullWidth' onChange={(event, newval) => { this.setState({ tab: newval }) }} aria-label="lab API tabs example">
                                        <Tab label="Item One" value="1" />
                                        <Tab label="Item Two" value="2" />
                                        <Tab label="Item Three" value="3" />
                                        <Tab label="Item Four" value="4" />
                                    </TabList>
                                </Box>
                            </Grid>
                            <Grid>
                                <FormGroup>
                                    <Stack spacing={3} style={{ alignItems: 'center', paddingTop: 5, paddingRight: 20 }} divider={<Divider orientation="vertical" flexItem />} direction='row'>
                                        <FormControlLabel labelPlacement="start" control={<Switch checked={this.state.range.follow} onChange={(e) => { this.setState({ range: { follow: e.target.checked, value: this.state.range.value } }) }} />} label="Follow" />
                                        <Slider aria-label="Default" valueLabelDisplay="auto" min={0} max={Math.max(this.state.data.PT_HE.length, 3)} value={this.state.range.value} onChange={(event, vals: number[]) => { this.setState({ range: { follow: false, value: vals } }) }} />
                                    </Stack>
                                </FormGroup>
                            </Grid>
                            <TabPanel value="1" style={{ padding: 10, paddingTop: 5 }}>
                                <Grid container item xs={12}>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_HE} timestamp={this.state.data.Timestamp} title={"PT_HE"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_Purge} timestamp={this.state.data.Timestamp} title={"PT_Purge"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_Pneu} timestamp={this.state.data.Timestamp} title={"PT_Pneu"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_FUEL_PV} timestamp={this.state.data.Timestamp} title={"PT_FUEL_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2" style={{ padding: 10, paddingTop: 5 }}>
                                <Grid container item xs={12}>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_LOX_PV} timestamp={this.state.data.Timestamp} title={"PT_LOX_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_CHAM} timestamp={this.state.data.Timestamp} title={"PT_CHAM"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_FUEL_PV} timestamp={this.state.data.Timestamp} title={"TC_FUEL_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_LOX_PV} timestamp={this.state.data.Timestamp} title={"TC_LOX_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="3" style={{ padding: 10, paddingTop: 5 }}>
                                <Grid container item xs={12}>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_LOX_Valve_Main} timestamp={this.state.data.Timestamp} title={"TC_LOX_Valve_Main"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_WATER_In} timestamp={this.state.data.Timestamp} title={"TC_WATER_In"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_WATER_Out} timestamp={this.state.data.Timestamp} title={"TC_WATER_Out"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_CHAM} timestamp={this.state.data.Timestamp} title={"TC_CHAM"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="4" style={{ padding: 10, paddingTop: 5 }}>
                                <Grid container item xs={12}>
                                    <Grid item xs={6}><Chart data={this.state.data.FT_Thrust} timestamp={this.state.data.Timestamp} title={"FT_Thrust"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.FL_WATER} timestamp={this.state.data.Timestamp} title={"FL_WATER"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: 10 }}>
                    <Grid>
                        <Diagram buttonState={this.state.buttonState} />
                    </Grid>
                    <Grid>
                        <ButtonGrid buttonState={this.state.buttonState} />
                    </Grid>
                </Grid>
            </Grid>
        </>)

    }
}

export default WebSocketList