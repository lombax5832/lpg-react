import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, ButtonGroup, Divider, FormControlLabel, FormGroup, Grid, Slider, Stack, Switch, Tab, Button } from "@mui/material";
import { Component } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!../worker/worker';
import WebSocketContext from "../context/websocketcontext";
import { IData } from "../interfaces/data";
import { ButtonState } from "../interfaces/buttonstate";
import ButtonGrid from "./buttongrid";
import Chart from "./chart";
import Diagram from "./diagram";
import DiagramGrid from "./diagramgrid";
import Multichart from "./multichart"
import { LOX_COLOR } from "../constants"
import { FUEL_COLOR } from "../constants"
import { PI_IP } from "../constants";

class WebSocketList extends Component<{}, { data: IData, range: { follow: boolean, value: number[] }, timeout: { status: Boolean }, tab: string, refTime: number, timeOffset: number }>{


    static contextType = WebSocketContext;

    constructor(props) {
        super(props);

        this.state = {
            timeOffset: 0,
            timeout: {
                status: false
            },
            refTime: 0,
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
            tab: '1'
        }
    }

    componentDidMount() {
        const worker = new Worker()
        worker.postMessage("HEY")
        worker.addEventListener('message', (ev) => {
            // console.log("MESSAGE RECEIVED:", ev)
            console.log(this.state.refTime)
            let data = JSON.parse(ev.data)
            if (data.PT_HE) {
                let newRange = this.state.range
                if (newRange.follow) {
                    newRange.value = [Math.max(this.state.data.Timestamp[this.state.data.Timestamp.length - 1] - 3, 0), Math.max(this.state.data.Timestamp[this.state.data.Timestamp.length - 1], 3)]
                }
                this.setState({
                    refTime: this.state.refTime,
                    range: newRange,
                    data: {
                        Timestamp: [...this.state.data.Timestamp, ...data.Timestamp.map((value) => value - this.state.timeOffset)],
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
            } else {
                // Received message does not contain properly formatted data
                console.log("!!! UPDATE MALFORMED !!!")
            }
        })
    }

    componentDidUpdate() {
    }

    setOffset() {
        this.setState({
            timeOffset: this.state.data.Timestamp[this.state.data.Timestamp.length - 1] + this.state.timeOffset,
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
            }
        })
    }

    render() {

        return (<>
            <Grid container>
                <Grid container item xs={9} >
                    <Box sx={{ width: '100%', typography: 'body1' }} style={{ padding: 0 }}>
                        <TabContext value={this.state.tab}>
                            <Grid container item /* This is the tab selector */>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                                    <TabList variant='fullWidth' onChange={(event, newval) => { this.setState({ tab: newval }) }} aria-label="lab API tabs example">
                                        <Tab label="All PT" value="1" />
                                        <Tab label="All TC" value="2" />
                                        <Tab label="Misc Inst." value="3" />
                                        <Tab label="Load State" value="4" />
                                        <Tab label="Operation State" value="5" />
                                    </TabList>
                                </Box>
                            </Grid>
                            <Grid /* This is the follow slider */>
                                <FormGroup>
                                    <Stack spacing={3} style={{ alignItems: 'center', paddingTop: 5, paddingRight: 20 }} divider={<Divider orientation="vertical" flexItem />} direction='row'>
                                        <FormControlLabel labelPlacement="start" control={<Switch checked={this.state.range.follow} onChange={(e) => { this.setState({ range: { follow: e.target.checked, value: this.state.range.value } }) }} />} label="Follow" />
                                        <Slider aria-label="Default" valueLabelDisplay="auto" min={0} max={Math.max(this.state.data.Timestamp[this.state.data.Timestamp.length - 1], 3)} value={this.state.range.value} onChange={(event, vals: number[]) => { this.setState({ range: { follow: false, value: vals } }) }} />
                                    </Stack>
                                </FormGroup>
                            </Grid>
                            <TabPanel value="1" style={{ padding: 10, paddingTop: 5 }} /* Charts for ALL PT Tab */>
                                <Grid container item xs={12}>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_HE} timestamp={this.state.data.Timestamp} title={"PT_HE"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_Purge} timestamp={this.state.data.Timestamp} title={"PT_Purge"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_Pneu} timestamp={this.state.data.Timestamp} title={"PT_Pneu"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_FUEL_PV} timestamp={this.state.data.Timestamp} title={"PT_FUEL_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_LOX_PV} timestamp={this.state.data.Timestamp} title={"PT_LOX_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_CHAM} timestamp={this.state.data.Timestamp} title={"PT_CHAM"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2" style={{ padding: 10, paddingTop: 5 }} /* Charts for ALL TC Tab */>
                                <Grid container item xs={12}>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_FUEL_PV} timestamp={this.state.data.Timestamp} title={"TC_FUEL_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Temperature (C)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_LOX_PV} timestamp={this.state.data.Timestamp} title={"TC_LOX_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Temperature (C)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_LOX_Valve_Main} timestamp={this.state.data.Timestamp} title={"TC_LOX_Valve_Main"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Temperature (C)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_WATER_In} timestamp={this.state.data.Timestamp} title={"TC_WATER_In"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Temperature (C)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_WATER_Out} timestamp={this.state.data.Timestamp} title={"TC_WATER_Out"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Temperature (C)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_CHAM} timestamp={this.state.data.Timestamp} title={"TC_CHAM"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Temperature (C)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="3" style={{ padding: 10, paddingTop: 5 }} /* Charts for Misc Inst. Tab */>
                                <Grid container item xs={12}>
                                    <Grid item xs={6}><Chart data={this.state.data.FT_Thrust} timestamp={this.state.data.Timestamp} title={"FT_Thrust"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.FL_WATER} timestamp={this.state.data.Timestamp} title={"FL_WATER"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="4" style={{ padding: 10, paddingTop: 5 }} /* Charts for LOAD STATE Tab */>
                                <Grid container item xs={12}>
                                    <Grid item xs={6}><Multichart /* TANK TCs, one chart */
                                        data={{
                                            series1: this.state.data.TC_FUEL_PV, series2: this.state.data.TC_LOX_PV, series3: [], series4: [],
                                            name1: "TC_FUEL_PV", name2: "TC_LOX_PV", name3: "", name4: "",
                                            color1: FUEL_COLOR, color2: LOX_COLOR, color3: "", color4: ""
                                        }}
                                        timestamp={this.state.data.Timestamp}
                                        title={"TANK TCs"}
                                        xaxis={{ range: this.state.range.value }}
                                        yaxis={{ range: [0, 500], title: "Temperature (C)" }} />
                                    </Grid>
                                    <Grid item xs={6}><Multichart /* TANK PT, one chart */
                                        data={{
                                            series1: this.state.data.PT_Pneu, series2: this.state.data.PT_HE, series3: this.state.data.PT_Purge, series4: [],
                                            name1: "PT_Pneu", name2: "PT_HE", name3: "PT_Purge", name4: "",
                                            color1: "", color2: "", color3: "", color4: ""
                                        }}
                                        timestamp={this.state.data.Timestamp}
                                        title={"TANK PTs"}
                                        xaxis={{ range: this.state.range.value }}
                                        yaxis={{ range: [0, 500], title: "Temperature (C)" }} />
                                    </Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_FUEL_PV} timestamp={this.state.data.Timestamp} title={"TC_FUEL_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Temperature (C)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_LOX_PV} timestamp={this.state.data.Timestamp} title={"TC_LOX_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Temperature (C)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="5" style={{ padding: 10, paddingTop: 5 }} /* Charts for  OPERATION STATE tab */ >
                                <Grid container item xs={12}>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_FUEL_PV} timestamp={this.state.data.Timestamp} title={"PT_FUEL_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_LOX_PV} timestamp={this.state.data.Timestamp} title={"PT_LOX_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_CHAM} timestamp={this.state.data.Timestamp} title={"PT_CHAM"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_CHAM} timestamp={this.state.data.Timestamp} title={"TC_CHAM"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Temperature (C)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.FL_WATER} timestamp={this.state.data.Timestamp} title={"FL_Water"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Flow Rate (L/s)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.FT_Thrust} timestamp={this.state.data.Timestamp} title={"FT_Thrust"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Force (Lbf)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: 10 }}>
                    <Grid /* The system diagram */>
                        <DiagramGrid data={{ // Only pass the last elements to save time
                            PT_HE : this.state.data.PT_HE[this.state.data.PT_HE.length - 1],
                            PT_Purge : this.state.data.PT_Purge[this.state.data.PT_Purge.length - 1],
                            PT_Pneu : this.state.data.PT_Pneu[this.state.data.PT_Pneu.length - 1],
                            PT_FUEL_PV : this.state.data.PT_FUEL_PV[this.state.data.PT_FUEL_PV.length - 1],
                            PT_LOX_PV : this.state.data.PT_LOX_PV[this.state.data.PT_LOX_PV.length - 1],
                            PT_CHAM : this.state.data.PT_CHAM[this.state.data.PT_CHAM.length - 1],
                            TC_FUEL_PV : this.state.data.TC_FUEL_PV[this.state.data.TC_FUEL_PV.length - 1],
                            TC_LOX_PV : this.state.data.TC_LOX_PV[this.state.data.TC_LOX_PV.length - 1],
                            TC_LOX_Valve_Main : this.state.data.TC_LOX_Valve_Main[this.state.data.TC_LOX_Valve_Main.length - 1],
                            TC_WATER_In : this.state.data.TC_WATER_In[this.state.data.TC_WATER_In.length - 1],
                            TC_WATER_Out : this.state.data.TC_WATER_Out[this.state.data.TC_WATER_Out.length - 1],
                            TC_CHAM : this.state.data.TC_CHAM[this.state.data.TC_CHAM.length - 1],
                            FT_Thrust : this.state.data.FT_Thrust[this.state.data.FT_Thrust.length - 1]
                        }}/>
                    </Grid>
                </Grid>
            </Grid>
        </>)

    }
}

export default WebSocketList