import { Box } from '@mui/system';
import { Component } from "react";
import { DIAGRAM_RESOURCES } from "../constants";
import { IData } from "../interfaces/data";
import NewLine  from "./newline"

const styles = {
    paperContainer: {
        backgroundImage: `url(${DIAGRAM_RESOURCES.baseImage})`,
        backgroundPosition: 'top center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        wight: '100vw'
    },

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
        width: '50px',
    },

    newline: {
        width: '100%'
    }
};

class DiagramGrid extends Component<{ data: IData }, {}>{

    render() {
        return (
            <div style={{ justifyContent: 'space-around', height: '100vh', width: '100%' }}>
                <div style={styles.paperContainer}>
                    <div style={{ position: 'relative', top: '45px', left: '82px' }}>
                        <Box sx={styles.flexBox}>
                            <div style={{textAlign: 'center'}}>
                                {"PT:HE"}
                                <NewLine></NewLine>
                                {this.props.data.PT_HE.length>1 ? this.props.data.PT_HE[this.props.data.PT_HE.length - 1] : "—"}
                                {"psi"}
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        )
    }

}

export default DiagramGrid