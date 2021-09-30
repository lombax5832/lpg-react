import { Button, Grid } from "@mui/material";
import { Component } from "react";
import { ButtonState } from "../interfaces/buttonstate";
import { PI_IP } from "../constants";

class ButtonGrid extends Component<{buttonState: ButtonState}, {}>{

    toggleState(key: keyof ButtonState) {
        let newButtonState: ButtonState = JSON.parse(JSON.stringify(this.props.buttonState))
        newButtonState[key] = !newButtonState[key]
        this.sendUpdate(newButtonState)
    }

    sendUpdate(newButtonState: ButtonState) {
        // Creating XHR object
        let xhr = new XMLHttpRequest();
        // xhr.open("POST", "http://65.78.156.235" + ":3003/serial/valve/update", true);
        xhr.open("POST", PI_IP + ":3003/serial/valve/update", true);
        // console.log(PI_IP+":3003/serial/valve/update")

        // Set the request header i.e. which type of content you are sending
        xhr.setRequestHeader("Content-Type", "application/json");

        // Converting JSON data to string
        var data = JSON.stringify(newButtonState);
        console.log(data);
        // Sending data with the request
        xhr.send(data);
    }

    render() {
        return (
            <div style={{ padding: 8, borderRadius: 10, border: '2px solid rgba(0, 0, 0, 0.3)', marginTop: 5 }}>
                <Grid container style={{ display: 'flex', justifyContent: 'center'}} spacing={1}>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.toggleState("FUEL_Press") }}>
                            FUEL-Press
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.toggleState("LOX_Press") }}>
                            LOX-Press
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.toggleState("FUEL_Vent") }}>
                            FUEL-Vent
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.toggleState("LOX_Vent") }}>
                            LOX-Vent
                        </Button>
                    </Grid>
                    
                    <Grid item xs={12} style={{columnSpan: 'all'}}>
                        <Button fullWidth variant="contained" onClick={() => { this.toggleState("MAIN") }}>
                            MAIN
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.toggleState("FUEL_Purge") }}>
                            FUEL-Purge
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.toggleState("LOX_Purge") }}>
                            LOX-Purge
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ButtonGrid

