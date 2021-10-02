import { IDiagram } from "./interfaces/diagram"

export const PI_IP: string = "http://192.168.137.10"
export const RESOURCES_LOCATION: string = process.env.PUBLIC_URL + "/resources/"

export const DIAGRAM_RESOURCES: IDiagram = {
    baseImage: RESOURCES_LOCATION + "state_default.svg",
    FUEL_Press: { name: "FUEL_Press", red: RESOURCES_LOCATION + "x-red.png", green: RESOURCES_LOCATION + "x-green.png", neutral: RESOURCES_LOCATION + "x-neutral.png" },
    LOX_Press: { name: "LOX_Press", red: "", green: "", neutral: "" },
    FUEL_Vent: { name: "FUEL_Vent", red: "", green: "", neutral: "" },
    LOX_Vent: { name: "LOX_Vent", red: "", green: "", neutral: "" },
    MAIN: { name: "MAIN", red: "", green: "", neutral: "" },
    FUEL_Purge: { name: "FUEL_Purge", red: "", green: "", neutral: "" },
    LOX_Purge: { name: "LOX_Purge", red: "", green: "", neutral: "" },
}