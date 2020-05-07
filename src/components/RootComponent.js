import React, { Component } from "react";
import Modal from "./Modal";
import { Chart } from "react-google-charts";

class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: props.searchData,
      query: "",
      filteredData: [],
      activeClass: "",
      errors: [],
      category: "all",
      showPopup: false,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  toggleClass = (currentclass) => {
    this.setState((prevState) => {
      return {
        activeClass: currentclass,
      };
    });
  };

  submitHandler = (category) => (event) => {
    event.preventDefault();
    this.toggleClass(category);
  };

  handleInputChange = (event) => {
    const query = event.target.value;

    this.setState((prevState) => {
      return {
        query,
      };
    });
  };

  render() {
    let containerData = (
      <div className="centered-text">
        <p colSpan="3">No Data!</p>
      </div>
    );

    let errors = "";
    if (this.state.errors) {
      errors = this.state.errors.map((item, index) => (
        <div key={index} className="alert alert-error">
          {item}
        </div>
      ));
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <h2 className="mt-3 title_head">Home</h2>
          {errors}
        </div>
        <div className="row">
          <div className={"chart-container chart_sizes"}>
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ['Age', 'Count'],
                ['Below 18', 1000],
                ['19 - 35', 1170],
                ['36 - 60', 660],
                ['Above 60', 1030],
              ]}
              options={{
                // Material design options
                chart: {
                  title: 'Based on Age',
                  subtitle: 'Counts based on Age',
                },
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
                  }
                }
              }}
              // For tests
              rootProps={{ 'data-testid': '2' }}
            />
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Survey Count', 'Numbers'],
                ['Accepted', 10],
                ['Rejected', 5]
              ]}
              options={{
                title: 'Based on Survey count',
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
          </div>
          <div className={"chart-container chart_sizes"}>
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Gender', 'Number'],
                ['M', 10],
                ['F', 10],
                ['NA', 10]
              ]}
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
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Search Count', 'Number'],
                ['Yes', 11],
                ['No', 2]
              ]}
              options={{
                title: 'Did you find the product you were searching for?',
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
          </div>
        </div>

        {this.state.showPopup ? (
          <Modal
            data={{
              id: 3,
              name: "Vishu",
              status: "open",
            }}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default RootComponent;
