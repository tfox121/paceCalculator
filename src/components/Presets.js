import React from "react";

import './Presets.css';

class Presets extends React.Component {
  onPresetChange = event => {
    this.props.onPresetChange(event.target.value);
  };

  render() {
    return (
      <div className="ui segment">
        <h3>Presets</h3>
        <label>Choose preset:</label>
          <br />
          <select name="runs" size="5" onChange={this.onPresetChange}>
           { this.props.presetList.map(preset => {
              return <option key={preset.title}>{preset.title}</option>
            })}
          </select>
      </div>
    );
  }
}

export default Presets