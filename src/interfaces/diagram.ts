export interface IDiagramStates {
    red: string,
    green: string,
    neutral: string,
    setting: "red" | "green" | "neutral"
}

export interface IDiagram {
    baseImage: string
    Fuel_Press: IDiagramStates
    LOX_Press: IDiagramStates
    FUEL_Vent: IDiagramStates
    LOX_Vent: IDiagramStates
    MAIN: IDiagramStates
    FUEL_Purge: IDiagramStates
    LOX_Purge: IDiagramStates
}