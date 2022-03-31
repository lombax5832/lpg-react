import { IDiagram } from "./interfaces/diagram"

export const PI_IP: string = "http://192.168.137.10"
export const RESOURCES_LOCATION: string = process.env.PUBLIC_URL + "/resources/"

export const LOX_COLOR: string = "rgb(71, 188, 255)"
export const FUEL_COLOR: string = "rgb(237, 108, 130)"

export const DIAGRAM_RESOURCES: IDiagram = {
    baseImage: RESOURCES_LOCATION + "BASE.svg",
    FUEL_Press: { name: "FUEL_Press", red: RESOURCES_LOCATION + "FUEL-Press_red.svg", green: RESOURCES_LOCATION + "FUEL-Press_green.svg", neutral: RESOURCES_LOCATION + "FUEL-Press_neutral.svg" },
    LOX_Press: { name: "LOX_Press", red: RESOURCES_LOCATION + "LOX-Press_red.svg", green: RESOURCES_LOCATION + "LOX-Press_green.svg", neutral: RESOURCES_LOCATION + "LOX-Press_neutral.svg" },
    FUEL_Vent: { name: "FUEL_Vent", red: RESOURCES_LOCATION + "FUEL-Vent_red.svg", green: RESOURCES_LOCATION + "FUEL-Vent_green.svg", neutral: RESOURCES_LOCATION + "FUEL-Vent_neutral.svg" },
    LOX_Vent: { name: "LOX_Vent", red: RESOURCES_LOCATION + "LOX-Vent_red.svg", green: RESOURCES_LOCATION + "LOX-Vent_green.svg", neutral: RESOURCES_LOCATION + "LOX-Vent_neutral.svg" },
    MAIN: { name: "MAIN", red: RESOURCES_LOCATION + "MAIN_red.svg", green: RESOURCES_LOCATION + "MAIN_green.svg", neutral: RESOURCES_LOCATION + "MAIN_neutral.svg" },
    FUEL_Purge: { name: "FUEL_Purge", red: RESOURCES_LOCATION + "FUEL-Purge_red.svg", green: RESOURCES_LOCATION + "FUEL-Purge_green.svg", neutral: RESOURCES_LOCATION + "FUEL-Purge_neutral.svg" },
    LOX_Purge: { name: "LOX_Purge", red: RESOURCES_LOCATION + "LOX-Purge_red.svg", green: RESOURCES_LOCATION + "LOX-Purge_green.svg", neutral: RESOURCES_LOCATION + "LOX-Purge_neutral.svg" },
}

export const DATA_COLLECT_URL: string = ":3002/serial/caching/"
export const DATA_STORAGE_URL: string = ":3004/serial/storage/"