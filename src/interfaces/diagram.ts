export interface IDiagramStates {
    name: string,
    red: string,
    green: string,
    neutral: string
}

export interface IDiagram {
    baseImage: string
    FUEL_Press: IDiagramStates
    LOX_Press: IDiagramStates
    FUEL_Vent: IDiagramStates
    LOX_Vent: IDiagramStates
    MAIN: IDiagramStates
    FUEL_Purge: IDiagramStates
    LOX_Purge: IDiagramStates
}

export interface IDiagramState {
    FUEL_Press: DiagramState
    LOX_Press: DiagramState
    FUEL_Vent: DiagramState
    LOX_Vent: DiagramState
    MAIN: DiagramState
    FUEL_Purge: DiagramState
    LOX_Purge: DiagramState
}

export interface IDiagramDataStyle {
    display: string
    border: string
    borderRadius: number
    fontSize: string
    m: number
    padding: string
    fontWeight: string
    bgcolor: string
    color: string
    width: string
}

type DiagramState = "red" | "green" | "neutral"