export interface IData {
    Timestamp: number[]
    PT_HE: number[]
    PT_Purge: number[]
    PT_Pneu: number[]
    PT_FUEL_PV: number[]
    PT_LOX_PV: number[]
    //PT_FUEL_INJ: number[]
    PT_CHAM: number[]
    TC_FUEL_PV: number[]
    TC_LOX_PV: number[]
    TC_LOX_Valve_Main: number[]
    TC_WATER_In: number[]
    TC_WATER_Out: number[]
    TC_CHAM: number[]
    //RC_LOX_Level: number[]
    FT_Thrust: number[]
    FL_WATER: number[]
}

export interface IDataLast {
    // Timestamp: number
    PT_HE: number
    PT_Purge: number
    PT_Pneu: number
    PT_FUEL_PV: number
    PT_LOX_PV: number
    //PT_FUEL_INJ: number
    PT_CHAM: number
    TC_FUEL_PV: number
    TC_LOX_PV: number
    TC_LOX_Valve_Main: number
    TC_WATER_In: number
    TC_WATER_Out: number
    TC_CHAM: number
    //RC_LOX_Level: number
    FT_Thrust: number
    // FL_WATER: number
}