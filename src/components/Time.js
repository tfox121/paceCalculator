import React from 'react';

import './Time.css';

class Time extends React.Component {
  onHoursChange = event => {
    this.props.onInputChange(event.target.value, 'Hours');
  };

  onMinsChange = event => {
    this.props.onInputChange(event.target.value, 'Mins');
  };

  onSecsChange = event => {
    this.props.onInputChange(event.target.value, 'Secs');
  };

  render() {
    return (
      <div className="time-container">
          <label>Hrs:</label>
          <input
            type="number"
            value={this.props.hours > 0 ? this.props.hours : ''}
            onChange={this.onHoursChange}
            min="0"
            max="1000"
            step="1"
          />
          <label>Mins:</label>
          <input
            type="number"
            value={this.props.mins > 0 ? this.props.mins : ''}
            onChange={this.onMinsChange}
            min="0"
            max="60"
            step="1"
          />
          <label>Secs:</label>
          <input
            type="number"
            value={this.props.secs > 0 ? this.props.secs : ''}
            onChange={this.onSecsChange}
            min="0"
            max="60"
            step="1"
          />
          {this.props.unit && 
            <div>
              {this.props.unit}
            </div>
          }
      </div>
    );
  }
}

export default Time;
