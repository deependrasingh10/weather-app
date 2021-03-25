import React, { Component, Fragment } from 'react';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';
import MenuBar from './MenuBar';
import { Grid, Typography } from '@material-ui/core';
import * as config from './../myconfig';
import Geocode from "react-geocode";

class Dashboard extends Component {
  state = {
    fullData: [],
    dailyData: [],
    degreeType: "fahrenheit",

  }

  updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.value
    }, () => console.log(this.state))
  }
  handleChangelang = (event) => {
    console.log(event.value);
    this.setState({ selectedlang: event.value });
    this.getWeatherForecast(event.value);
  }
  componentDidMount = () => {
    let lat;
    let lon;
    // Geocode.setApiKey(config.googleApiKey);
    navigator.geolocation.getCurrentPosition(function(position) {
      // console.log("Latitude is :", position);
      // console.log("Longitude is :", position.coords.longitude);
      lat=position.coords.latitude;
      lon=position.coords.longitude;
    });
    this.getWeatherForecast('hi', lat, lon);
  }

  getWeatherForecast = (lang, lat, lon) => {
    const lat1= lat ? lat : 28.4259974;
    const lon1= lon ? lon : 76.9450375;
    // const weatherURL =`${config.apiUrl}zip=11102&units=imperial&lang=${lang}&APPID=${config.appApiId}`;
    const weatherURL =`${config.apiUrl}lat=${lat1}&lon=${lon1}&units=imperial&lang=${lang}&APPID=${config.appApiId}`;
    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({
        fullData: data.list,
        dailyData: dailyData
      }, () => console.log(this.state))
    })

    Geocode.setLanguage(lang);
    Geocode.fromLatLng(lat1, lon1).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      (error) => {
        console.log(error);
        console.error(error);
      }
    );
  }

  showDayCards = () => {
    return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={this.state.degreeType} />)
  }

  render() {
    return (
      <Fragment>
        
        <Grid container >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MenuBar selectLang={true} handleChangelang={this.handleChangelang} />
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