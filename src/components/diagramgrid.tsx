import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { Component } from "react";
import { DIAGRAM_RESOURCES } from "../constants";
import { IDataLast } from "../interfaces/data";
import DisplayLastData from './displaylastdata';

const styles = {
    paperContainer: {
        backgroundImage: `url(${DIAGRAM_RESOURCES.baseImage})`,
        backgroundPosition: 'top center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '650px',
        wight: '100vw'
    }
};

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            {...other}
        />
    );
}

Item.propTypes = {
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

// Creates a grid with a background image of the system and displays the most recent datapoint for each sensor overtop it
// Featuring cringe hardcoded pixel locations
class DiagramGrid extends Component<{ data: IDataLast }, {}> {

    render() {
        return (
            <div style={{ position: 'relative', justifyContent: 'space-around', height: '100%', width: '100%' }}>
                <Box style={styles.paperContainer}>
                    <Item /*PT HE*/>
                        <Box style={{ position: 'absolute', top: '35px', left: '77px' }}>
                            <DisplayLastData ID='P:HE' data={this.props.data.PT_HE} unit='psi' color='LightGreen' />
                        </Box>
                    </Item>
                    <Item /*PT Pneu*/>
                        <Box style={{ position: 'absolute', top: '35px', left: '222px' }}>
                            <DisplayLastData ID='P:Pneu' data={this.props.data.PT_Pneu} unit='psi' color='LightGreen' />
                        </Box>
                    </Item>
                    <Item /*PT Purge*/>
                        <Box style={{ position: 'absolute', top: '35px', left: '360px' }}>
                            <DisplayLastData ID='P:F_INJ' data={this.props.data.PT_FUEL_INJ} unit='psi' color='LightGreen'/>
                        </Box>
                    </Item>
                    <Item /*PT FUEL PV*/>
                        <Box style={{ position: 'absolute', top: '270px', left: '5px' }}>
                            <DisplayLastData ID='P:FUEL' data={this.props.data.PT_FUEL_PV} unit='psi' color='LightGreen'/>
                        </Box>
                    </Item>
                    <Item /*PT LOX PV*/>
                        <Box style={{ position: 'absolute', top: '270px', left: '141px' }}>
                            <DisplayLastData ID='P:LOX' data={this.props.data.PT_LOX_PV} unit='psi' color='LightGreen'/>
                        </Box>
                    </Item>
                    <Item /*TC FUEL PV*/>
                        <Box style={{ position: 'absolute', top: '340px', left: '5px' }}>
                            <DisplayLastData ID='T:FUEL' data={this.props.data.TC_FUEL_PV} unit='°C' color='LightSkyBlue'/>
                        </Box>
                    </Item>
                    <Item /*TC LOX PV*/>
                        <Box style={{ position: 'absolute', top: '340px', left: '141px' }}>
                            <DisplayLastData ID='T:LOX' data={this.props.data.TC_LOX_PV} unit='°C' color='LightSkyBlue'/>
                        </Box>
                    </Item>
                    <Item /*TC LOX VALVE*/>
                        <Box style={{ position: 'absolute', top: '420px', left: '85px' }}>
                            <DisplayLastData ID='T:LOX Valve' data={this.props.data.TC_LOX_Valve_Main} unit='°C' color='LightSkyBlue'/>
                        </Box>
                    </Item>
                    <Item /*TC WATER OUT*/>
                        <Box style={{ position: 'absolute', top: '465px', left: '250px' }}>
                            <DisplayLastData ID='T:OUT' data={this.props.data.TC_WATER_Out} unit='°C' color='LightSkyBlue'/>
                        </Box>
                    </Item>
                    <Item /*TC WATER IN*/>
                        <Box style={{ position: 'absolute', top: '465px', left: '340px' }}>
                            <DisplayLastData ID='T:IN' data={this.props.data.TC_WATER_In} unit='°C' color='LightSkyBlue'/>
                        </Box>
                    </Item>
                    <Item /*FT Thrust*/>
                        <Box style={{ position: 'absolute', top: '546px', left: '85px' }}>
                            <DisplayLastData ID='F:Thrust' data={this.props.data.FT_Thrust} unit='lbf' color='Peru'/>
                        </Box>
                    </Item>
                    <Item /*PT CHAM*/>
                        <Box style={{ position: 'absolute', top: '546px', left: '292px' }}>
                            <DisplayLastData ID='P:CHAM' data={this.props.data.PT_CHAM} unit='psi' color='LightGreen'/>
                        </Box>
                    </Item>
                    <Item /*TC CHAM*/>
                        <Box style={{ position: 'absolute', top: '546px', left: '389px' }}>
                            <DisplayLastData ID='T:CHAM' data={this.props.data.TC_CHAM} unit='°C' color='LightSkyBlue'/>
                        </Box>
                    </Item>
                </Box>
            </div>
        )
    }

}

export default DiagramGrid