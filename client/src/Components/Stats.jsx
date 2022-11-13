import { useEffect, useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import Container from "react-bootstrap/Container";
import { renderMatches } from "react-router-dom";

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: [],
      data: [],
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      all: [],
      burglary: [],
      assault: [],
      homicide: [],
      weapons: [],
    };
    this.getIncidents();
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData = () => {
    const bars = Math.random(6, 10);
    return Math.range(bars).map((bar) => {
      return { x: bar + 1, y: Math.random(2, 10) };
    });
  };

  // export const Stats = () => {
  //   const [incidents, setIncidents] = useState([]);
  //   const [data, setdata] = useState([]);

  setStatssData = async (data) => {
    let weekdays = new Array(7);
    weekdays[0] = 0;
    weekdays[1] = 0;
    weekdays[2] = 0;
    weekdays[3] = 0;
    weekdays[4] = 0;
    weekdays[5] = 0;
    weekdays[6] = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].dayOfWeek == "Sunday") {
        weekdays[0] += 1;
      } else if (data[i].dayOfWeek == "Monday") {
        weekdays[1] += 1;
      } else if (data[i].dayOfWeek == "Tuesday") {
        weekdays[2] += 1;
      } else if (data[i].dayOfWeek == "Wednesday") {
        weekdays[3] += 1;
      } else if (data[i].dayOfWeek == "Thursday") {
        weekdays[4] += 1;
      } else if (data[i].dayOfWeek == "Friday") {
        weekdays[5] += 1;
      } else if (data[i].dayOfWeek == "Saturday") {
        weekdays[6] += 1;
      }
    }
    this.setState({
      data: weekdays,
      all: weekdays,
    });
  };

  setStatsData = async (data, type) => {
    let weekdays = new Array(7);
    weekdays[0] = 0;
    weekdays[1] = 0;
    weekdays[2] = 0;
    weekdays[3] = 0;
    weekdays[4] = 0;
    weekdays[5] = 0;
    weekdays[6] = 0;

    for (let i = 0; i < data.length; i++) {
      if (type == "All" || data[i].type == type) {
        if (data[i].dayOfWeek == "Sunday") {
          weekdays[0] += 1;
        } else if (data[i].dayOfWeek == "Monday") {
          weekdays[1] += 1;
        } else if (data[i].dayOfWeek == "Tuesday") {
          weekdays[2] += 1;
        } else if (data[i].dayOfWeek == "Wednesday") {
          weekdays[3] += 1;
        } else if (data[i].dayOfWeek == "Thursday") {
          weekdays[4] += 1;
        } else if (data[i].dayOfWeek == "Friday") {
          weekdays[5] += 1;
        } else if (data[i].dayOfWeek == "Saturday") {
          weekdays[6] += 1;
        }
      }
    }
    this.setState({
      data: weekdays,
    });
  };

  getIncidents = async () => {
    let response = await fetch("http://localhost:4000/incidents/", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Accept: "application/json, text/plain, */*",
      },
    });

    response = await response.json();

    this.setState({
      incidents: response,
    });

    this.setStatsData(response, "All");

    console.log(response);
  };

  handleChange = (e) => {
    let val = e.target.value;
    // if (val == "All") {
    this.setStatsData(this.state.incidents, val);
    // } else if (val == "Assault") {
    // }
  };

  //   useEffect(() => {
  //     setIncidents(getIncidents());
  //   }, []);

  render() {
    return (
      <Container>
        {/* <div>
          <VictoryChart
            theme={VictoryTheme.material}
            // domainPadding will add space to each side of VictoryBar to
            // prevent it from overlapping the axis
            domainPadding={1}
          >
            <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
              tickValues={[0, 1, 2, 3, 4, 5, 6, 7]}
              tickFormat={this.state.labels}
            />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              //   tickFormat={(x) => `$${x / 1000}k`}
            />
            <VictoryBar data={this.state.data} x="day" y="count" />
          </VictoryChart>
        </div> */}
        <VictoryChart domainPadding={{ x: 20 }} animate={{ duration: 500 }}>
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[0, 1, 2, 3, 4, 5, 6, 7]}
            tickFormat={this.state.labels}
            style={{ tickLabels: { angle: 45 }, margin: 10 }}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            //   tickFormat={(x) => `$${x / 1000}k`}
          />
          <VictoryBar
            data={this.state.data}
            style={{
              data: { fill: "tomato", width: 12 },
            }}
            animate={{
              onExit: {
                duration: 500,
                before: () => ({
                  _y: 0,
                  fill: "orange",
                  label: "BYE",
                }),
              },
            }}
          />
        </VictoryChart>
        <br></br>
        <br></br>
        <br></br>

        <Button onClick={(e) => this.handleChange(e)} value="All">
          All
        </Button>
        <Button
          style={{ marginLeft: "20px" }}
          onClick={(e) => this.handleChange(e)}
          value="Assault"
        >
          Assault
        </Button>
        <Button
          style={{ marginLeft: "20px" }}
          onClick={(e) => this.handleChange(e)}
          value="Assault"
        >
          Burglary
        </Button>
        <Button
          style={{ marginLeft: "20px" }}
          onClick={(e) => this.handleChange(e)}
          value="Homicide"
        >
          Homicide
        </Button>
        <Button
          style={{ marginLeft: "20px" }}
          onClick={(e) => this.handleChange(e)}
          value="Weapons"
        >
          Weapons
        </Button>
      </Container>
    );
  }
}
