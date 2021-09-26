import zIndex from "@mui/material/styles/zIndex";
import { Component } from "react";

class Diagram extends Component<{}, {}>{

    componentDidMount() {

    }

    render() {
        return (
            <div style={{ position: 'relative' }}>
                <img width='100%' style={{ position: 'relative', left: 0, top: 0, zIndex: 0 }} draggable='false' src={process.env.PUBLIC_URL + "/resources/test.png"} />
                <img width='100%' style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }} draggable='false' src={process.env.PUBLIC_URL + "/resources/x.png"} />

            </ div>
        )
    }
}

export default Diagram