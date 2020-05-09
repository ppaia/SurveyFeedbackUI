import React, { Component } from "react";
import Modal from "./Modal";
import AgeGraph from "./graphs/AgeGraph";
import SurveyGraph from "./graphs/SurveyGraph";
import GenderGraph from "./graphs/GenderGraph";
import SearchCountGraph from "./graphs/SearchCountGraph";

class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      showPopup: false,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
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
            <AgeGraph />
            <SurveyGraph />
          </div>
          <div className={"chart-container chart_sizes"}>
            <GenderGraph />
            <SearchCountGraph />
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
