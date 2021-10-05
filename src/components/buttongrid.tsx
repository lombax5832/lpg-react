import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { Component } from "react";
import { PI_IP } from "../constants";
import { ButtonState } from "../interfaces/buttonstate";

class ButtonGrid extends Component<{ buttonState: ButtonState }, { currentState: boolean }>{
    constructor(props) {
        super(props);

        this.state = {
            currentState: false
        }
    }

    toggleState(key: string) {
        let newLoadingButtonState: ButtonState = JSON.parse(JSON.stringify(this.props.buttonState))
        newLoadingButtonState[key] = !newLoadingButtonState[key]
        this.setState({ currentState: false })
        this.sendUpdate(newLoadingButtonState)
    }

    componentDidMount() {
        setInterval(() => {
            if (!this.state.currentState) {
                let xhr = new XMLHttpRequest();
                // xhr.open("GET", "http://65.78.156.235" + ":3003/serial/valve/update", true);
                xhr.open("GET", PI_IP + ":3003/serial/valve/update", true);
                console.log("PINGING")
                xhr.send();
            }
        }, 1000)
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.buttonState) != JSON.stringify(this.props.buttonState)) {
            this.setState({ currentState: true })
        }
    }

    sendUpdate(newLoadingButtonState: ButtonState) {
        // Creating XHR object
        let xhr = new XMLHttpRequest();
        // xhr.open("POST", "http://65.78.156.235" + ":3003/serial/valve/update", true);
        xhr.open("POST", PI_IP + ":3003/serial/valve/update", true);
        // console.log(PI_IP+":3003/serial/valve/update")

        // Set the request header i.e. which type of content you are sending
        xhr.setRequestHeader("Content-Type", "application/json");

        // Converting JSON data to string
        var data = JSON.stringify(newLoadingButtonState);
        console.log(data);
        // Sending data with the request
        xhr.send(data);
    }

    render() {
        return (
            <div style={{ padding: 8, borderRadius: 10, border: '2px solid rgba(0, 0, 0, 0.3)', marginTop: 5 }}>
                <Grid container style={{ display: 'flex', justifyContent: 'center' }} spacing={1}>
                    <Grid item xs={6}>
                        <LoadingButton loadingPosition="start" loading={!this.state.currentState} disabled={!this.state.currentState} fullWidth variant="contained" onClick={() => { this.toggleState("FUEL_Press") }}>
                            {`Fuel-Press: ${this.props.buttonState.FUEL_Press ? 'Open' : 'Closed'}`}
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton loadingPosition="start" loading={!this.state.currentState} disabled={!this.state.currentState} fullWidth variant="contained" onClick={() => { this.toggleState("LOX_Press") }}>
                            {`LOX_Press: ${this.props.buttonState.LOX_Press ? 'Open' : 'Closed'}`}
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton loadingPosition="start" loading={!this.state.currentState} disabled={!this.state.currentState} fullWidth variant="contained" onClick={() => { this.toggleState("FUEL_Vent") }}>
                            {`FUEL_Vent: ${this.props.buttonState.FUEL_Vent ? 'Open' : 'Closed'}`}
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton loadingPosition="start" loading={!this.state.currentState} disabled={!this.state.currentState} fullWidth variant="contained" onClick={() => { this.toggleState("LOX_Vent") }}>
                            {`LOX_Vent: ${this.props.buttonState.LOX_Vent ? 'Open' : 'Closed'}`}
                        </LoadingButton>
                    </Grid>

                    <Grid item xs={12} style={{ columnSpan: 'all' }}>
                        <LoadingButton loadingPosition="start" loading={!this.state.currentState} disabled={!this.state.currentState} fullWidth variant="contained" onClick={() => { this.toggleState("MAIN") }}>
                            {`MAIN: ${this.props.buttonState.MAIN ? 'Open' : 'Closed'}`}
                        </LoadingButton>
                    </Grid>

                    <Grid item xs={6}>
                        <LoadingButton loadingPosition="start" loading={!this.state.currentState} disabled={!this.state.currentState} fullWidth variant="contained" onClick={() => { this.toggleState("FUEL_Purge") }}>
                            {`FUEL_Purge: ${this.props.buttonState.FUEL_Purge ? 'Open' : 'Closed'}`}
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton loadingPosition="start" loading={!this.state.currentState} disabled={!this.state.currentState} fullWidth variant="contained" onClick={() => { this.toggleState("LOX_Purge") }}>
                            {`LOX_Purge: ${this.props.buttonState.LOX_Purge ? 'Open' : 'Closed'}`}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ButtonGrid

