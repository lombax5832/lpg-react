import { TabContext, TabList, TabPanel, LoadingButton } from "@mui/lab";
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
import { PI_IP, DATA_COLLECT_URL, DATA_STORAGE_URL } from "../constants";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AlertDialog from "./alertdialog";

const processActive = createTheme({
    palette: {
        action: {
            disabledBackground: 'green',
            disabled: 'black'
        }
    }
})

class WebSocketList extends Component<{}, { data: IData, range: { follow: boolean, value: number[] }, timeout: { status: Boolean }, tab: string, refTime: number, timeOffset: number, dataButtonEnable: boolean, dataButtonUnlock: boolean, dataButtonOpenDialog: boolean, storageButtonEnable: boolean, storageButtonUnlock: boolean, storageButtonOpenDialog: boolean }>{


    static contextType = WebSocketContext;

    constructor(props) {
        super(props);

        this.updateButtonEnable = this.updateButtonEnable.bind(this);

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
                //PT_Purge: [],
                PT_LOX_2: [],
                PT_FUEL_PV: [],
                PT_LOX_PV: [],
                PT_FUEL_INJ: [],
                PT_CHAM: [],
                TC_FUEL_PV: [],
                TC_LOX_PV: [],
                // TC_LOX_Valve_Main: [],
                TC_WATER_In: [],
                TC_WATER_Out: [],
                TC_CHAM: [],
                //RC_LOX_Level: [],
                FT_Thrust: []
            },
            tab: '1',
            dataButtonEnable: true,
            dataButtonUnlock: false,
            dataButtonOpenDialog: false,
            storageButtonEnable: true,
            storageButtonUnlock: false,
            storageButtonOpenDialog: false

        }
    }

    componentDidMount() {
        this.queryDataCollectionStatus()
        this.queryDataStorageStatus()

        const worker = new Worker()
        worker.postMessage("HEY")
        worker.addEventListener('message', (ev) => {
            // console.log("MESSAGE RECEIVED:", ev)
            // console.log(this.state.refTime)
            // console.log(ev.data)
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
                        //PT_Purge: [...this.state.data.PT_Purge, ...data.PT_Purge],
                        PT_LOX_2: [...this.state.data.PT_LOX_2, ...data.PT_LOX_2],
                        PT_FUEL_PV: [...this.state.data.PT_FUEL_PV, ...data.PT_FUEL_PV],
                        PT_LOX_PV: [...this.state.data.PT_LOX_PV, ...data.PT_LOX_PV],
                        PT_FUEL_INJ: [...this.state.data.PT_FUEL_INJ, ...data.PT_FUEL_INJ],
                        PT_CHAM: [...this.state.data.PT_CHAM, ...data.PT_CHAM],
                        TC_FUEL_PV: [...this.state.data.TC_FUEL_PV, ...data.TC_FUEL_PV],
                        TC_LOX_PV: [...this.state.data.TC_LOX_PV, ...data.TC_LOX_PV],
                        // TC_LOX_Valve_Main: [...this.state.data.TC_LOX_Valve_Main, ...data.TC_LOX_Valve_Main],
                        TC_WATER_In: [...this.state.data.TC_WATER_In, ...data.TC_WATER_In],
                        TC_WATER_Out: [...this.state.data.TC_WATER_Out, ...data.TC_WATER_Out],
                        TC_CHAM: [...this.state.data.TC_CHAM, ...data.TC_CHAM],
                        //RC_LOX_Level: [...this.state.data.RC_LOX_Level, ...data.RC_LOX_Level],
                        FT_Thrust: [...this.state.data.FT_Thrust, ...data.FT_Thrust]
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
                //PT_Purge: [],
                PT_LOX_2: [],
                PT_FUEL_PV: [],
                PT_LOX_PV: [],
                PT_FUEL_INJ: [],
                PT_CHAM: [],
                TC_FUEL_PV: [],
                TC_LOX_PV: [],
                // TC_LOX_Valve_Main: [],
                TC_WATER_In: [],
                TC_WATER_Out: [],
                TC_CHAM: [],
                //RC_LOX_Level: [],
                FT_Thrust: []
            }
        })
    }

    queryDataCollectionStatus() {
        console.log("Check collection status")
        // Ping the Pi to determine the current status of the data collection system
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log(xhr.readyState)
            console.log(xhr.status)
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                console.log(xhr.responseText)
                if (xhr.responseText == "True") {
                    this.setState({ dataButtonEnable: false });
                } else {
                    this.setState({ dataButtonEnable: true })
                }
            }
        }.bind(this)
        xhr.open("GET", PI_IP + DATA_COLLECT_URL + "STATUS", true);
        xhr.send();
    }

    startDataCollection() {
        // Disable the button
        // Enable the abort button
        this.setState({ dataButtonEnable: false });
        // Command Pi to collect Data
        // http request goes here
        let xhr = new XMLHttpRequest();
        // xhr.open("GET", "http://65.78.156.235" + ":3003/serial/valve/update", true);
        xhr.open("GET", PI_IP + DATA_COLLECT_URL + "START", true);
        xhr.send();
    }

    queryDataStorageStatus() {
        console.log("Check storage status")
        // Ping the Pi to determine the current status of the data storage system
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                if (xhr.responseText == "True") {
                    // console.log("Storage is enabled")
                    this.setState({ storageButtonEnable: false })
                } else {
                    this.setState({ storageButtonEnable: true })
                }
            }
        }.bind(this)
        xhr.open("GET", "http://localhost" + DATA_STORAGE_URL + "STATUS", true);
        xhr.send();
    }

    startDataStorage() {
        // Disable the button
        // Enable the abort button
        this.setState({ storageButtonEnable: false })
        // Command Pi to store data
        // http request goes here
        let xhr = new XMLHttpRequest();
        // xhr.open("GET", "http://65.78.156.235" + ":3003/serial/valve/update", true);
        xhr.open("GET", "http://localhost" + DATA_STORAGE_URL + "START", true);
        xhr.send();
    }

    stopDataCollection() {
        // Enable the prompt
        this.setState({ dataButtonOpenDialog: true });
        // Stopping the data collection is handled in alertdialog.tsx
    }

    stopDataStorage() {
        // Enable the prompt
        this.setState({ storageButtonOpenDialog: true })
    }

    updateButtonEnable = (newState, dialogName) => {
        // Lets Alertdialog modify the button state
        switch (dialogName) {
            case 'data collection':
                this.setState({ dataButtonEnable: newState });
                break;
            case 'data storage':
                this.setState({ storageButtonEnable: newState });
                break;
            default:
                console.log('ERR: dialog not match cases in updateButtonEnable')
        }
    }

    closeDialog = (dialogName) => {
        // Closes a dialog box
        switch (dialogName) {
            case 'data collection':
                this.setState({ dataButtonOpenDialog: false });
                break;
            case 'data storage':
                this.setState({ storageButtonOpenDialog: false });
                break;
            default:
                console.log('ERR: dialog not match cases in closeDialog')
        }
    }

    writeData() {
        let xhr = new XMLHttpRequest();
        // xhr.open("GET", "http://65.78.156.235" + ":3003/serial/valve/update", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                alert(xhr.responseText)
            }
        }.bind(this)
        xhr.open("GET", "http://localhost" + DATA_STORAGE_URL + "WRITE", true);
        xhr.send();
    }

    render(): JSX.Element {

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
                                    <Grid item xs={6}><Chart data={this.state.data.PT_HE} timestamp={this.state.data.Timestamp} title={"PT_HE"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 2500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_FUEL_INJ} timestamp={this.state.data.Timestamp} title={"PT_FUEL_INJ"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    {/* <Grid item xs={6}><Chart data={this.state.data.PT_Pneu} timestamp={this.state.data.Timestamp} title={"PT_Pneu"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 150], title: "Pressure (PSI)" }} /></Grid> */}
                                    <Grid item xs={6}><Chart data={this.state.data.PT_FUEL_PV} timestamp={this.state.data.Timestamp} title={"PT_FUEL_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    {/* <Grid item xs={6}><Chart data={this.state.data.PT_LOX_PV} timestamp={this.state.data.Timestamp} title={"PT_LOX_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid> */}
                                    <Grid item xs={6}><Multichart
                                        data={{
                                            series1: this.state.data.PT_LOX_PV, series2: this.state.data.PT_LOX_2, series3: [], series4: [],
                                            name1: "PT_LOX_PV", name2: "PT_LOX_2", name3: "", name4: "",
                                            color1: FUEL_COLOR, color2: LOX_COLOR, color3: "", color4: ""
                                        }}
                                        timestamp={this.state.data.Timestamp}
                                        title={"PT_LOX_PV"}
                                        xaxis={{ range: this.state.range.value }}
                                        yaxis={{ range: [0, 500], title: "Pressure (PSI)" }}/>
                                    </Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_CHAM} timestamp={this.state.data.Timestamp} title={"PT_CHAM"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2" style={{ padding: 10, paddingTop: 5 }} /* Charts for ALL TC Tab */>
                                <Grid container item xs={12}>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_FUEL_PV} timestamp={this.state.data.Timestamp} title={"TC_FUEL_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [-270, 100], title: "Temperature (C)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_LOX_PV} timestamp={this.state.data.Timestamp} title={"TC_LOX_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [-270, 100], title: "Temperature (C)" }} /></Grid>
                                    {/* <Grid item xs={6}><Chart data={this.state.data.TC_LOX_Valve_Main} timestamp={this.state.data.Timestamp} title={"TC_LOX_Valve_Main"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [-270, 100], title: "Temperature (C)" }} /></Grid> */}
                                    <Grid item xs={6}><Chart data={this.state.data.TC_WATER_In} timestamp={this.state.data.Timestamp} title={"TC_WATER_In"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [-270, 100], title: "Temperature (C)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_WATER_Out} timestamp={this.state.data.Timestamp} title={"TC_WATER_Out"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [-270, 100], title: "Temperature (C)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_CHAM} timestamp={this.state.data.Timestamp} title={"TC_CHAM"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [-270, 100], title: "Temperature (C)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="3" style={{ padding: 10, paddingTop: 5 }} /* Charts for Misc Inst. Tab */>
                                <Grid container item xs={12}>
                                    <Grid item xs={6}><Chart data={this.state.data.FT_Thrust} timestamp={this.state.data.Timestamp} title={"FT_Thrust"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 600], title: "Force (Lb)" }} /></Grid>
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
                                            series1: [], series2: this.state.data.PT_HE, series3: this.state.data.PT_FUEL_INJ, series4: [],
                                            name1: "PT_Pneu", name2: "PT_HE", name3: "PT_FUEL_INJ", name4: "",
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
                                    {/* <Grid item xs={6}><Chart data={this.state.data.PT_LOX_PV} timestamp={this.state.data.Timestamp} title={"PT_LOX_PV"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid> */}
                                    <Grid item xs={6}><Multichart
                                        data={{
                                            series1: this.state.data.PT_LOX_PV, series2: this.state.data.PT_LOX_2, series3: [], series4: [],
                                            name1: "PT_LOX_PV", name2: "PT_LOX_2", name3: "", name4: "",
                                            color1: FUEL_COLOR, color2: LOX_COLOR, color3: "", color4: ""
                                        }}
                                        timestamp={this.state.data.Timestamp}
                                        title={"PT_LOX_PV"}
                                        xaxis={{ range: this.state.range.value }}
                                        yaxis={{ range: [0, 500], title: "Pressure (PSI)" }}/>
                                    </Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.PT_CHAM} timestamp={this.state.data.Timestamp} title={"PT_CHAM"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Pressure (PSI)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.TC_CHAM} timestamp={this.state.data.Timestamp} title={"TC_CHAM"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Temperature (C)" }} /></Grid>
                                    <Grid item xs={6}><Chart data={this.state.data.FT_Thrust} timestamp={this.state.data.Timestamp} title={"FT_Thrust"} xaxis={{ range: this.state.range.value }} yaxis={{ range: [0, 500], title: "Force (Lbf)" }} /></Grid>
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: 10 }}>
                    <Grid /* The system diagram */>
                        <DiagramGrid data={{ // Only pass the last elements to save time
                            PT_HE: this.state.data.PT_HE[this.state.data.PT_HE.length - 1],
                            // PT_Purge: this.state.data.PT_Purge[this.state.data.PT_Purge.length - 1],
                            PT_LOX_2: this.state.data.PT_LOX_2[this.state.data.PT_LOX_2.length - 1],
                            PT_FUEL_PV: this.state.data.PT_FUEL_PV[this.state.data.PT_FUEL_PV.length - 1],
                            PT_LOX_PV: this.state.data.PT_LOX_PV[this.state.data.PT_LOX_PV.length - 1],
                            PT_FUEL_INJ: this.state.data.PT_FUEL_INJ[this.state.data.PT_FUEL_INJ.length - 1],
                            PT_CHAM: this.state.data.PT_CHAM[this.state.data.PT_CHAM.length - 1],
                            TC_FUEL_PV: this.state.data.TC_FUEL_PV[this.state.data.TC_FUEL_PV.length - 1],
                            TC_LOX_PV: this.state.data.TC_LOX_PV[this.state.data.TC_LOX_PV.length - 1],
                            // TC_LOX_Valve_Main: this.state.data.TC_LOX_Valve_Main[this.state.data.TC_LOX_Valve_Main.length - 1],
                            TC_WATER_In: this.state.data.TC_WATER_In[this.state.data.TC_WATER_In.length - 1],
                            TC_WATER_Out: this.state.data.TC_WATER_Out[this.state.data.TC_WATER_Out.length - 1],
                            TC_CHAM: this.state.data.TC_CHAM[this.state.data.TC_CHAM.length - 1],
                            FT_Thrust: this.state.data.FT_Thrust[this.state.data.FT_Thrust.length - 1]
                        }} />
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={8}/* ABORT Button */>
                            <div style={{ padding: 8, borderRadius: 10, border: '2px solid rgba(0, 0, 0, 0.3)', marginTop: 10 }}>
                                <ThemeProvider theme={processActive} >
                                    <LoadingButton loadingPosition="start" color='error' loading={!this.state.dataButtonEnable} disabled={!this.state.dataButtonEnable} fullWidth variant="contained" onClick={() => { this.startDataCollection() }} sx={{ fontWeight: 'bold' }}>
                                        {`DATA COLLECTION: ${this.state.dataButtonEnable ? 'DISABLED' : 'ENABLED'}`}
                                    </LoadingButton>
                                </ThemeProvider>
                            </div>
                            <div style={{ padding: 8, borderRadius: 10, border: '2px solid rgba(0, 0, 0, 0.3)', marginTop: 20 }}>
                                <ThemeProvider theme={processActive} >
                                    <LoadingButton loadingPosition="start" color='error' loading={!this.state.storageButtonEnable} disabled={!this.state.storageButtonEnable} fullWidth variant="contained" onClick={() => { this.startDataStorage() }} sx={{ fontWeight: 'bold' }}>
                                        {`DATA STORAGE: ${this.state.storageButtonEnable ? 'DISABLED' : 'ENABLED'}`}
                                    </LoadingButton>
                                </ThemeProvider>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div style={{ padding: 8, borderRadius: 10, border: '2px solid rgba(0, 0, 0, 0.3)', marginTop: 10 }}>
                                <LoadingButton loadingPosition="start" color='error' disabled={this.state.dataButtonEnable} fullWidth variant="contained" onClick={() => { this.stopDataCollection() }} sx={{ fontWeight: 'bold' }}>
                                    STOP?
                                </LoadingButton>
                                <AlertDialog action={this.updateButtonEnable} triggerOpenDialog={this.state.dataButtonOpenDialog} dialogName={"data collection"} closeDialogFCN={this.closeDialog} />
                            </div>
                            <div style={{ padding: 8, borderRadius: 10, border: '2px solid rgba(0, 0, 0, 0.3)', marginTop: 20 }}>
                                <LoadingButton loadingPosition="start" color='error' disabled={this.state.storageButtonEnable} fullWidth variant="contained" onClick={() => { this.stopDataStorage() }} sx={{ fontWeight: 'bold' }}>
                                    STOP?
                                </LoadingButton>
                                <AlertDialog action={this.updateButtonEnable} triggerOpenDialog={this.state.storageButtonOpenDialog} dialogName={"data storage"} closeDialogFCN={this.closeDialog} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ padding: 8, borderRadius: 10, border: '2px solid rgba(0, 0, 0, 0.3)', marginTop: 10 }}>
                                <Button variant="contained" color="success" fullWidth onClick={() => { this.writeData() }} sx={{ fontWeight: 'bold' }}>
                                    SAVE DATA SNAPSHOT
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>)

    }
}

export default WebSocketList