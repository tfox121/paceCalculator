import React from "react";
// import styled from "styled-components"

import Distance from "./Distance";
import Presets from "./Presets";
import Selector from "./Selector";
import Time from "./Time";

import { presetList } from "../presetList";

class App extends React.Component {
  state = {
    distance: 0,
    unit: "km",
    pace: 0,
    timeHours: 0,
    timeMins: 0,
    timeSecs: 0,
    paceHours: 0,
    paceMins: 0,
    paceSecs: 0,
    timeSelector: "pace",
    distanceSelector: "pace",
    paceSelector: "time"
  };

  getSecs = (hours, mins, secs) => {
    return (hours * 60 + mins) * 60 + secs;
  };

  roundTo2 = num => {
    return +(Math.round(num + "e+2") + "e-2");
  };

  paceCalc = () => {
    return Math.round(
      this.getSecs(
        this.state.timeHours,
        this.state.timeMins,
        this.state.timeSecs
      ) / this.state.distance
    );
  };

  timeCalc = () => {
    return (
      this.getSecs(
        this.state.paceHours,
        this.state.paceMins,
        this.state.paceSecs
      ) * this.state.distance
    );
  };

  getHoursMinsSecs = timeSecs => {
    const secs = Math.round(timeSecs % 60);
    const mins = ((timeSecs - secs) / 60) % 60;
    const hours = ((timeSecs - secs) / 60 - mins) / 60;
    console.log(secs)
    return { hours, mins, secs };
  };

  setTime = () => {
    this.setState({
      timeHours: this.getHoursMinsSecs(this.timeCalc()).hours,
      timeMins: this.getHoursMinsSecs(this.timeCalc()).mins,
      timeSecs: this.getHoursMinsSecs(this.timeCalc()).secs
    });
  };

  setDistance = () => {
    const timeSecs = this.getSecs(
      this.state.timeHours,
      this.state.timeMins,
      this.state.timeSecs
    );
    const paceSecs = this.getSecs(
      this.state.paceHours,
      this.state.paceMins,
      this.state.paceSecs
    );
    if (!timeSecs || !paceSecs) {
      return 0;
    }
    this.setState({
      distance: this.roundTo2(timeSecs / paceSecs)
    });
  };

  setPace = () => {
    this.setState({
      paceHours: this.getHoursMinsSecs(this.paceCalc()).hours,
      paceMins: this.getHoursMinsSecs(this.paceCalc()).mins,
      paceSecs: this.getHoursMinsSecs(this.paceCalc()).secs
    });
  };

  onTimeChange = (time, unit) => {
    if (time < 0 || time > 60) {
      return;
    }
    this.setState({ [`time${unit}`]: parseInt(time, 10) || 0 }, () => {
      if (this.state.timeSelector === "pace") {
        if (this.state.distance === 0) {
          return;
        }
        this.setPace();
      }
      if (this.state.timeSelector === "distance") {
        if (
          this.state.paceHours === 0 &&
          this.state.paceMins === 0 &&
          this.state.paceSecs === 0
        ) {
          return;
        }
        this.setDistance();
      }
    });
  };

  onDistanceChange = value => {
    value = parseFloat(value);
    this.setState({ distance: value || 0 }, () => {
      if (this.state.distanceSelector === "pace") {
        if (
          this.state.timeHours === 0 &&
          this.state.timeMins === 0 &&
          this.state.timeSecs === 0
        ) {
          return;
        }
        this.setPace();
        return;
      }
      if (this.state.distanceSelector === "time") {
        if (
          this.state.paceHours === 0 &&
          this.state.paceMins === 0 &&
          this.state.paceSecs === 0
        ) {
          return;
        }
        this.setTime();
      }
    });
  };

  onPresetChange = value => {
    console.log(value);
    const selectedPreset = presetList.filter(preset => {
      return preset.title === value;
    })[0];
    this.setState(
      {
        distance: selectedPreset.distance,
        unit: selectedPreset.unit
      },
      () => {
        if (this.state.distanceSelector === "pace") {
          if (
            this.state.timeHours === 0 &&
            this.state.timeMins === 0 &&
            this.state.timeSecs === 0
          ) {
            return;
          }
          this.setPace();
          return;
        }
        if (this.state.distanceSelector === "time") {
          if (
            this.state.paceHours === 0 &&
            this.state.paceMins === 0 &&
            this.state.paceSecs === 0
          ) {
            return;
          }
          this.setTime();
        }
      }
    );
  };

  onUnitChange = value => {
    this.setState({ unit: value });
    if (this.state.distance === 0) {
      return;
    }
    this.setState(
      {
        distance: this.roundTo2(
          this.state.distance * (value === "mi" ? 0.621371192 : 1.609344)
        )
      },
      () => {
        if (this.state.distanceSelector === "pace") {
          if (
            this.state.timeHours === 0 &&
            this.state.timeMins === 0 &&
            this.state.timeSecs === 0
          ) {
            return;
          }
          if (this.state.distance === 0) {
            return;
          }
          this.setPace();
          return;
        }
        if (this.state.distanceSelector === "time") {
          if (
            this.state.paceHours === 0 &&
            this.state.paceMins === 0 &&
            this.state.paceSecs === 0
          ) {
            return;
          }
          this.setTime();
        }
      }
    );
  };

  onPaceChange = (time, unit) => {
    if (time < 0 || time > 60) {
      return;
    }
    this.setState({ [`pace${unit}`]: parseInt(time, 10) || 0 }, () => {
      if (this.state.paceSelector === "time") {
        if (this.state.distance === 0 || !this.state.distance) {
          return;
        }
        // CALCULATE TIME BASED ON DISTANCE * PACE
        this.setTime();
        return;
      }
      if (this.state.paceSelector === "distance") {
        if (
          this.state.timeHours === 0 &&
          this.state.timeMins === 0 &&
          this.state.timeSecs === 0
        ) {
          return;
        }
        // CALCULATE DISTANCE BASED ON TIME / PACE
        this.setDistance();
      }
    });
  };

  onSelectorChange = (value, source) => {
    this.setState({ [`${source}Selector`]: value });
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui segment">
          <div className="field">
            <h1>Time</h1>
            <Time
              hours={this.state.timeHours}
              mins={this.state.timeMins}
              secs={this.state.timeSecs}
              onInputChange={this.onTimeChange}
            />
          </div>
          <Selector
            onSelectorChange={this.onSelectorChange}
            source="time"
            className1="pace"
            title1="Pace"
            className2="distance"
            title2="Distance"
          />
        </div>
        <div className="ui segment">
          <h1>Distance</h1>
          <div className="ui grid">
            <div className="column eight wide">
              <Distance
                distance={this.state.distance}
                unit={this.state.unit}
                onInputChange={this.onDistanceChange}
                onUnitChange={this.onUnitChange}
              />
            </div>
            <div className="column eight wide">
              <Presets
                presetList={presetList}
                onPresetChange={this.onPresetChange}
              />
            </div>
          </div>
          <Selector
            onSelectorChange={this.onSelectorChange}
            source="distance"
            className1="pace"
            title1="Pace"
            className2="time"
            title2="Time"
          />
        </div>
        <div className="ui segment">
          <div className="field">
            <h1>Pace</h1>
            <Time
              hours={this.state.paceHours}
              mins={this.state.paceMins}
              secs={this.state.paceSecs}
              onInputChange={this.onPaceChange}
              unit={` per ${this.state.unit}`}
            />
            <Selector
              onSelectorChange={this.onSelectorChange}
              source="pace"
              className1="time"
              title1="Time"
              className2="distance"
              title2="Distance"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
