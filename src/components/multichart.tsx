import Plotly from "plotly.js-basic-dist";
import { Component } from "react";

import createPlotlyComponent from 'react-plotly.js/factory'

const Plot = createPlotlyComponent(Plotly);

class Multichart extends Component<{
    data: {
        series1: number[], series2: number[], series3: number[],
        name1: string, name2: string, name3: string, name4: string,
        color1: string, color2: string, color3: string, color4: string
    },
    timestamp: number[],
    title: string,
    xaxis: { range: number[] },
    yaxis: { range: number[], title: string }
},
    {}>{

    render() {
        return (<Plot
            data={[
                { type: 'scattergl', x: this.props.timestamp, y: this.props.data.series1, name: this.props.data.name1, line: { color: this.props.data.color1 } },
                { type: 'scattergl', x: this.props.timestamp, y: this.props.data.series2, name: this.props.data.name2, line: { color: this.props.data.color2 } },
                { type: 'scattergl', x: this.props.timestamp, y: this.props.data.series3, name: this.props.data.name3, line: { color: this.props.data.color3 } },
            ]}
            onRelayout={(val) => console.log("Selected", val)}
            layout={{
                margin: { t: 30, l: 50, b: 30, r: 30 },
                autosize: true,
                // width: 700, 
                // height: 500, 
                title: this.props.title,
                xaxis: {
                    range: this.props.xaxis.range,
                    // title: 'Time (s)'
                },
                yaxis: this.props.yaxis,
                legend: { xanchor: 'right' }
            }}
            style={{
                width: "100%",
                height: 300
            }}
            config={{
                responsive: true
            }}
        />)
    }
}

export default Multichart