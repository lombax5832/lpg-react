import { Component } from "react";
import { RESOURCES_LOCATION } from "../constants";
import { IDiagram, IDiagramStates } from "../interfaces/diagram";

class Diagram extends Component<{}, { diagramResources: IDiagram }>{
    constructor(props) {
        super(props);
        this.state = {
            diagramResources: {
                baseImage: process.env.PUBLIC_URL + "/resources/state_default.svg",
                Fuel_Press: { red: RESOURCES_LOCATION + "x-red.png", green: RESOURCES_LOCATION + "x-green.png", neutral: RESOURCES_LOCATION + "x-neutral.png", setting: "neutral" },
                LOX_Press: { red: "", green: "", neutral: "", setting: "neutral" },
                FUEL_Vent: { red: "", green: "", neutral: "", setting: "neutral" },
                LOX_Vent: { red: "", green: "", neutral: "", setting: "neutral" },
                MAIN: { red: "", green: "", neutral: "", setting: "neutral" },
                FUEL_Purge: { red: "", green: "", neutral: "", setting: "neutral" },
                LOX_Purge: { red: "", green: "", neutral: "", setting: "neutral" },
            },
        }
    }
    componentDidMount() {

    }

    render() {
        let valves = [this.state.diagramResources.Fuel_Press,
        this.state.diagramResources.LOX_Press,
        this.state.diagramResources.FUEL_Vent,
        this.state.diagramResources.LOX_Vent,
        this.state.diagramResources.MAIN,
        this.state.diagramResources.FUEL_Purge,
        this.state.diagramResources.LOX_Purge
        ]
        return (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ position: 'relative', width: '70%' }}>
                    <img width='100%' style={{ position: 'relative', left: 0, top: 0, zIndex: 0 }} draggable='false' src={this.state.diagramResources.baseImage} />
                    {valves.map((value: IDiagramStates, index) => {
                        return <img width='100%' style={{ position: 'absolute', left: 0, top: 0, zIndex: index + 1 }} draggable='false' src={value[value.setting]} />
                    })}
                </div>
            </div>
        )
    }
}

export default Diagram