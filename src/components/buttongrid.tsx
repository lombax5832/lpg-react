import { Grid, Button } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { Component } from "react";

class ButtonGrid extends Component<{}, {}>{
    startCaching() {
        console.log("CACHING START")
        fetch("http://192.168.137.10:3002/serial/caching/START")
    }

    render() {
        return (
            <Grid>
                <Grid>
                    <Button variant="contained" onClick={() => { this.startCaching() }}>
                        Launch Caching
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default ButtonGrid

