import { Component } from "react";
import { bgcolor, Box } from '@mui/system';
import { IData } from "../interfaces/data";
import NewLine from "./newline"
import { IDiagramDataStyle } from "../interfaces/diagram";

const styles = {
    flexBox: {
        display: 'inline-block',
        border: '2px solid',
        borderRadius: 2,
        fontSize: '1rem',
        m: 1,
        padding: '3px 10px 3px 10px',
        fontWeight: '600',
        // bgcolor: 'lavender',
        color: 'black',
        width: '60px',
    },
}

class DisplayLastData extends Component<{ ID: string, data: number, unit: string, color: string }, { style: IDiagramDataStyle}> {

    constructor(props) {
        super(props)

        this.state = {
            // Props for flexbox 'sx' using the interface in diagram.ts
            style: {
                display: 'inline-block',
                border: '2px solid',
                borderRadius: 2,
                fontSize: '1rem',
                m: 1,
                padding: '3px 10px 3px 10px',
                fontWeight: '600',
                bgcolor: 'lavender', // Default value
                color: 'black',
                width: '60px',
            }

        }

    }

    render() {
        return ( 
            <Box {...this.state.style.bgcolor=this.props.color} sx={this.state.style}>
                <div style={{ textAlign: 'center' }}>
                    {this.props.ID}
                    <NewLine />
                    {this.props.data ? this.props.data : "—"}
                    {this.props.unit}
                </div>
            </Box>

        )
    }
}

export default DisplayLastData