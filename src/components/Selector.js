import React from "react";

import "./Selector.css";

class Selector extends React.Component {
  onSelectorChange = event => {
    this.props.onSelectorChange(event.target.value, this.props.source);
  };

  render() {
    return (
      <div className="ui segment selector-container">
        Calculate for:
        <div className="selector" onChange={this.onSelectorChange}>
          <input
            type="radio"
            id={this.props.className1}
            name={`${this.props.source}Selector`}
            value={this.props.className1}
            defaultChecked
          />
          <label htmlFor={this.props.className1}>{this.props.title1}</label>
          <br />
          <input
            type="radio"
            id={this.props.className2}
            name={`${this.props.source}Selector`}
            value={this.props.className2}
          />
          <label htmlFor={this.props.className2}>{this.props.title2}</label>
          <br />
        </div>
      </div>
    );
  }
}

export default Selector;
