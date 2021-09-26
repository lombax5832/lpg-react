import { Grid, Button, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import zIndex from "@mui/material/styles/zIndex";
import { width } from "@mui/system";
import { Component } from "react";

class ButtonGrid extends Component<{}, {}>{
    startCaching() {
        console.log("CACHING START")
        fetch("http://192.168.137.10:3002/serial/caching/START")
    }

    render() {
        return (
            <div style={{ padding: 8, borderRadius: 10, border: '2px solid rgba(0, 0, 0, 0.3)', marginTop: 5 }}>
                <Grid container style={{ display: 'flex', justifyContent: 'center'}} spacing={1}>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.startCaching() }}>
                            FUEL-Press
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.startCaching() }}>
                            LOX-Press
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.startCaching() }}>
                            FUEL-Vent
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.startCaching() }}>
                            LOX-Vent
                        </Button>
                    </Grid>
                    
                    <Grid item xs={12} style={{columnSpan: 'all'}}>
                        <Button fullWidth variant="contained" onClick={() => { this.startCaching() }}>
                            MAIN
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.startCaching() }}>
                            FUEL-Purge
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => { this.startCaching() }}>
                            LOX-Purge
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ButtonGrid

