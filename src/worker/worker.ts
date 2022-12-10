/* ./worker/worker.ts */
import { IData } from "../interfaces/data";

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    initWebSocket("ws://localhost:3003", (message) => { ctx.postMessage(message) })
});

function initWebSocket(url: string, callback: (message: string) => void): void {
    // Process the data without stalling the UI

    let timeout: boolean = false;
    let startTime: number = Number.MAX_SAFE_INTEGER

    let data: IData = {
        Timestamp: [],
        PT_HE: [],
        // PT_Purge: [],
        PT_LOX_2: [],
        PT_FUEL_PV: [],
        PT_LOX_PV: [],
        PT_FUEL_INJ: [],
        PT_CHAM: [],
        TC_FUEL_PV: [],
        TC_LOX_PV: [],
        // TC_LOX_Valve_Main: [],
        TC_WATER_In: [],
        TC_WATER_Out: [],
        TC_CHAM: [],
        //RC_LOX_Level: [],
        FT_Thrust: []
    }

    const socket = new WebSocket(url);

    socket.onerror = err => {
        console.error(
            "Socket encountered error: ",
            err,
            "Closing socket"
        );

        socket.close();
    };

    socket.addEventListener('message', (event: MessageEvent) => {

        // console.log(event.data)
        let item = JSON.parse(event.data)
        console.log(item.message)

        const flushData = () => {
            callback(JSON.stringify(data))
            data = {
                Timestamp: [],
                PT_HE: [],
                // PT_Purge: [],
                PT_LOX_2: [],
                PT_FUEL_PV: [],
                PT_LOX_PV: [],
                PT_FUEL_INJ: [],
                PT_CHAM: [],
                TC_FUEL_PV: [],
                TC_LOX_PV: [],
                // TC_LOX_Valve_Main: [],
                TC_WATER_In: [],
                TC_WATER_Out: [],
                TC_CHAM: [],
                //RC_LOX_Level: [],
                FT_Thrust: []
            }
        }

        const sendButtonState = (message: any) => {
            callback(JSON.stringify(message))
        }

        //Check to see if the message is graph data
        if (item.message[0]?.PT_HE) {
            item.message.forEach((val, i) => {
                startTime = Math.min(startTime, val.Timestamp)
                data = {
                    Timestamp: [...data.Timestamp, (val.Timestamp - startTime) / 1000],
                    PT_HE: [...data.PT_HE, val.PT_HE],
                    // PT_Purge: [...data.PT_Purge, val.PT_Purge],
                    PT_LOX_2: [...data.PT_LOX_2, val.PT_LOX_2],
                    PT_FUEL_PV: [...data.PT_FUEL_PV, val.PT_FUEL_PV],
                    PT_LOX_PV: [...data.PT_LOX_PV, val.PT_LOX_PV],
                    PT_FUEL_INJ: [...data.PT_FUEL_INJ, val.PT_FUEL_INJ],
                    PT_CHAM: [...data.PT_CHAM, val.PT_CHAM],
                    TC_FUEL_PV: [...data.TC_FUEL_PV, val.TC_FUEL_PV],
                    TC_LOX_PV: [...data.TC_LOX_PV, val.TC_LOX_PV],
                    // TC_LOX_Valve_Main: [...data.TC_LOX_Valve_Main, val.TC_LOX_Valve_Main],
                    TC_WATER_In: [...data.TC_WATER_In, val.TC_WATER_In],
                    TC_WATER_Out: [...data.TC_WATER_Out, val.TC_WATER_Out],
                    TC_CHAM: [...data.TC_CHAM, val.TC_CHAM],
                    //RC_LOX_Level: [...data.RC_LOX_Level, val.RC_LOX_Level],
                    FT_Thrust: [...data.FT_Thrust, val.FT_Thrust]
                }


                if ((i + 1) % 2000 === 0) {
                    flushData()
                }
            })

            if (!timeout) {
                timeout = true
                setTimeout(() => {
                    flushData()
                    timeout = false
                }, 100)
            }

            socket.send("RECEIVED DATA")
        }


        if (item.message=='PING') {
            console.log("RECEIVED PING")
            socket.send("PONG")
        }

    })
}