import { Component } from "react";
import { DIAGRAM_RESOURCES } from "../constants";
import { ButtonState } from "../interfaces/buttonstate";
import { IDiagramState, IDiagramStates } from "../interfaces/diagram";

class Diagram extends Component<{ buttonState: ButtonState }, { diagramState: IDiagramState }>{
    constructor(props) {
        super(props);
        this.state = {
            diagramState: {
                FUEL_Press: "neutral",
                LOX_Press: "neutral",
                FUEL_Vent: "neutral",
                LOX_Vent: "neutral",
                MAIN: "neutral",
                FUEL_Purge: "neutral",
                LOX_Purge: "neutral",
            },
        }
    }

    render() {
        let valves = [DIAGRAM_RESOURCES.FUEL_Press,
        DIAGRAM_RESOURCES.LOX_Press,
        DIAGRAM_RESOURCES.FUEL_Vent,
        DIAGRAM_RESOURCES.LOX_Vent,
        DIAGRAM_RESOURCES.MAIN,
        DIAGRAM_RESOURCES.FUEL_Purge,
        DIAGRAM_RESOURCES.LOX_Purge
        ]
        return (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ position: 'relative', width: '70%' }}>
                    <img width='100%' style={{ position: 'relative', left: 0, top: 0, zIndex: 0 }} draggable='false' src={DIAGRAM_RESOURCES.baseImage} />
                    {console.log(this.props.buttonState)}
                    {valves.map((value: IDiagramStates, index) => {
                        console.log(value.name, ':', this.props.buttonState[value.name] ? "green" : "red")
                        return <img width='100%' style={{ position: 'absolute', left: 0, top: 0, zIndex: index + 1 }} draggable='false' src={value[this.props.buttonState[value.name] ? "green" : "red"]} />
                    })}
                </div>
            </div>
        )
    }
}

export default Diagram