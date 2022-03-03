import { Box } from '@mui/system';
import { Component } from "react";
import { DIAGRAM_RESOURCES } from "../constants";
import { IData } from "../interfaces/data";
import DisplayLastData from './displaylastdata';

const styles = {
    paperContainer: {
        backgroundImage: `url(${DIAGRAM_RESOURCES.baseImage})`,
        backgroundPosition: 'top center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        wight: '100vw'
    }
};

class DiagramGrid extends Component<{ data: IData }, {}> {

    render() {
        return (
            <div style={{ justifyContent: 'space-around', height: '100vh', width: '100%' }}>
                <div style={styles.paperContainer}>
                    <div style={{ position: 'relative', top: '45px', left: '78px' }}>
                        <DisplayLastData ID='PT:HE' data={this.props.data.PT_HE} unit='psi'></DisplayLastData>
                    </div>
                    <div style={{ position: 'relative', top: '45px', left: '78px' }}>
                        <DisplayLastData ID ='PT:Pneu' data={this.props.data.PT_Purge} unit='psi'></DisplayLastData>
                    </div>
                </div>
            </div>
        )
    }

}

export default DiagramGrid