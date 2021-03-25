import React, { Component, Fragment } from 'react';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';
import MenuBar from './MenuBar';
import { Grid, Typography } from '@material-ui/core';
import * as config from './../myconfig';

class Dashboard extends Component {
  state = {
    fullData: [],
    dailyData: [],
    degreeType: "fahrenheit"
  }

  updateForecastDegree = event => {
    console.log(event.target.value);
    this.setState({
      degreeType: event.target.value
    }, () => console.log(this.state))
  }

  componentDidMount = () => {
    const weatherURL =`${config.apiUrl}zip=11102&units=imperial&lang=hi&APPID=${config.appApiId}`;
    console.log(`MyConfig: ${weatherURL}`)
    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({
        fullData: data.list,
        dailyData: dailyData
      }, () => console.log(this.state))
    })
  }

  showDayCards = () => {
    return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={this.state.degreeType} />)
  }

  render() {
    return (
      <Fragment>
        
        <Grid container >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MenuBar selectLang={true} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{margin: "10px"}} className='jumbotron'>
            <Grid container justify='center' alignItems='center'>
            <Typography variant='h1'>5-Day Forecast</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} >
            <Grid container justify='center' alignItems='center'>
            <Typography variant='h5'>New York, US</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{padding: "10px"}} >
            <Grid container justify='center' alignItems='center'>
              <DegreeToggle degreeType={this.state.degreeType}
                            updateForecastDegree={this.updateForecastDegree} />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} >
            <Grid container justify='center' alignItems='center'>
              {this.showDayCards()}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Dashboard;