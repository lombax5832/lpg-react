import { Component } from "react";
import { Box } from '@mui/system';
import { IData } from "../interfaces/data";
import NewLine from "./newline"

const styles={
    flexBox: {
        display: 'inline-block',
        border: '2px solid',
        borderRadius: 2,
        fontSize: '1rem',
        m: 1,
        padding: '3px 10px 3px 10px',
        fontWeight: '600',
        bgcolor: 'lavender',
        color: 'black',
        width: '60px',
    }
}

class DisplayLastData extends Component<{ ID: string, data: number[], unit: string}, {}> {
    render() {
        return (
            <Box sx={styles.flexBox}>
                <div style={{textAlign: 'center'}}>
                    {this.props.ID}
                    <NewLine></NewLine>
                    {this.props.data.length>1 ? this.props.data[this.props.data.length - 1] : "—"}
                    {this.props.unit}
                </div>
            </Box>
        )
    }
}

export default DisplayLastData