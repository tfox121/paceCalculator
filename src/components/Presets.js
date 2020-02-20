import React from "react";

import './Presets.css';

class Presets extends React.Component {
  onPresetChange = event => {
    this.props.onPresetChange(event.target.value);
  };

  render() {
    return (
      <div className="ui segment preset-container">
        <h3>Presets</h3>
        <label>Choose preset:</label>
        <div className="preset-selector">
          <select name="runs" size="5" onChange={this.onPresetChange}>
            {this.props.presetList.map(preset => {
              return <option key={preset.title}>{preset.title}</option>
            })}
          </select>
        </div>
      </div>
    );
  }
}

export default Presets