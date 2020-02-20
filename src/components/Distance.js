import React from "react";

import "./Distance.css";

class Distance extends React.Component {
  onInputChange = event => {
    this.props.onInputChange(event.target.value);
  };

  onUnitChange = event => {
    this.props.onUnitChange(event.target.value);
  };

  render() {
    return (
      <div className="ui segment distance-container">
        <h3>Manual</h3>
        <div className="distance-subcontainer">
          <div>
            <label>Enter your own distance:</label>
          </div>
          <div className="input-container">
            <br />
            <input
              type="number"
              value={this.props.distance > 0 ? this.props.distance : ''}
              onChange={this.onInputChange}
            />
            <div className="distance-units">
              <input
                type="radio"
                id="km"
                name="distance"
                value="km"
                min="0"
                checked={this.props.unit === "km"}
                onChange={this.onUnitChange}
              />
              <label htmlFor="km">km</label>
              <input
                type="radio"
                id="mi"
                name="distance"
                value="mi"
                checked={this.props.unit === "mi"}
                onChange={this.onUnitChange}
              />
              <label htmlFor="mi">mi</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Distance;
