import Plotly from "plotly.js-basic-dist";
import { Component } from "react";

import createPlotlyComponent from 'react-plotly.js/factory'

const Plot = createPlotlyComponent(Plotly);

class Chart extends Component<{ data: number[], title: string, xaxis: { range: number[] }, yaxis: { range: number[], title: string } }, {}>{

    render() {
        return (<Plot
            data={[{ type: 'scattergl', y: this.props.data }]} onRelayout={(val) => console.log("Selected", val)}
            layout={{
                margin: { t: 30, l: 30, b: 30, r: 30 },
                autosize: true,
                // width: 700, 
                // height: 500, 
                title: this.props.title,
                xaxis: {
                    range: this.props.xaxis.range,
                    title: 'Time (s)'
                },
                yaxis: this.props.yaxis,
            }}
            style={{
                width: "100%",
                height: 500
            }}
            config={{
                responsive: true
            }}
        />)
    }
}

export default Chart