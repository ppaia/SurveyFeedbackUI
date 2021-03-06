import React, { Component } from "react";
import { Chart } from "react-google-charts";
import Loader from 'react-loader-spinner';

class PincodeGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            graphData: []
        };
    }

    fetchGraphsData() {
        // Where we're fetching data from
        fetch(process.env.REACT_APP_URL + `rest/chatbot/survey/getSurveyCountByPincode`)
            // We get the API response and receive data in JSON format...
            .then((response) => response.json())
            // ...then we update the users state
            .then((data) => {
    
                let requiredData = [
                    ['Gender', 'Count']
                ];

                Object.keys(data).map(key => {
                    return requiredData.push([key, data[key]]);
                });

                this.setState({
                    graphData: requiredData,
                    isLoading: false,
                })
            })
            // Catch any errors we hit and update the app
            .catch((error) => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.fetchGraphsData();
    }

    render() {
        return (
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<Loader
                    className="bars_loader"
                    type="Bars"
                    color="#00BFFF"
                    height={50}
                    width={50}
                    timeout={5000} //3 secs
                />}
                data={(this.state.graphData.length) ? this.state.graphData : ""}
                options={{
                    title: 'Based on Gender',
                    // Just add this option
                    is3D: true,
                    fontSize: 16,
                    titleTextStyle: {
                        color: "#504334",    // any HTML string color ('red', '#cc00cc')
                        fontName: "Roboto", // i.e. 'Times New Roman'
                        fontSize: 16, // 12, 18 whatever you want (don't specify px)
                        bold: false,    // true or false
                        italic: false,  // true of false
                        alignment: "center"
                    },
                    legend: {
                        position: 'right',
                        textStyle: {
                            color: 'green',
                            fontSize: 16
                        },
                        alignment: "center"
                    },
                    chartArea: {
                        left: 10,
                        top: '25%',
                        width: '100%',
                        height: '75%'
                    }
                }}
                rootProps={{ 'data-testid': '2' }}
            />
        );
    }
}

export default PincodeGraph;