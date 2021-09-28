import { Component } from "react";

class Diagram extends Component<{}, {}>{

    componentDidMount() {

    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                <div style={{ position: 'relative', width: '70%'}}>
                    <img width='100%' style={{ position: 'relative', left: 0, top: 0, zIndex: 0 }} draggable='false' src={process.env.PUBLIC_URL + "/resources/state_default.svg"} />
                    <img width='100%' style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }} draggable='false' src={process.env.PUBLIC_URL + "/resources/x.png"} />
                </div>
            </div>
        )
    }
}

export default Diagram