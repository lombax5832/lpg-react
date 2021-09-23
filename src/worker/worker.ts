/* ./worker/worker.ts */
import { IData } from "../interfaces/data";

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

// Post data to parent thread
ctx.postMessage({ foo: "foo" });

// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    ctx.postMessage("starting websocket");
    initWebSocket("ws://localhost:8765", (message) => { ctx.postMessage(message) })
});

function initWebSocket(url: string, callback: (message: string) => void): void {
    // Process the data without stalling the UI

    const socket = new WebSocket(url);

    socket.addEventListener('message', (event: MessageEvent) => {
        let data: IData = {
            PT_HE: [],
            PT_Purge: [],
            PT_Pneu: [],
            PT_FUEL_PV: [],
            PT_LOX_PV: [],
            PT_FUEL_INJ: [],
            PT_CHAM: [],
            TC_FUEL_PV: [],
            TC_LOX_PV: [],
            TC_LOX_Valve_Main: [],
            RC_LOX_Level: [],
            FT_Thrust: []
        }

        let item = JSON.parse(event.data)
        item.message.forEach((val, i) => {
            console.log(i)
            data = {
                PT_HE: [...data.PT_HE, val.PT_HE],
                PT_Purge: [...data.PT_Purge, val.PT_Purge],
                PT_Pneu: [...data.PT_Pneu, val.PT_Pneu],
                PT_FUEL_PV: [...data.PT_FUEL_PV, val.PT_FUEL_PV],
                PT_LOX_PV: [...data.PT_LOX_PV, val.PT_LOX_PV],
                PT_FUEL_INJ: [...data.PT_FUEL_INJ, val.PT_FUEL_INJ],
                PT_CHAM: [...data.PT_CHAM, val.PT_CHAM],
                TC_FUEL_PV: [...data.TC_FUEL_PV, val.TC_FUEL_PV],
                TC_LOX_PV: [...data.TC_LOX_PV, val.TC_LOX_PV],
                TC_LOX_Valve_Main: [...data.TC_LOX_Valve_Main, val.TC_LOX_Valve_Main],
                RC_LOX_Level: [...data.RC_LOX_Level, val.RC_LOX_Level],
                FT_Thrust: [...data.FT_Thrust, val.FT_Thrust],
            }
        })

        callback(JSON.stringify(data))
    })
}