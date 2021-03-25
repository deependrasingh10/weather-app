import React from 'react';
import * as moment from "moment";
import { Grid, Typography, Paper } from '@material-ui/core';

const DayCard = ({ reading, degreeType }) => {
    let newDate = new Date();
    const weekday = reading.dt * 1000
    newDate.setTime(weekday)
  
    const fahrenheit = Math.round(reading.main.temp)
    const celsius = Math.round((fahrenheit - 32) * 5/9)
  
    const imgURL = `owf owf-${reading.weather[0].id} owf-5x`;
  
    return (
      <Paper elevation={4} style={{ width: '200px', margin: "10px", padding: "10px"}}>
          <Grid container >
          <Grid item xs={12} sm={12} md={12} lg={12} style={{margin: "2px"}}>
            <Grid container justify='center' alignItems='center'>
              <Typography variant='h4'>{moment(newDate).format('dddd')}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{paddingBottom: "10px"}} >
            <Grid container justify='center' alignItems='center'>
            <Typography variant='subtitle1'>{moment(newDate).format('MMMM Do, h:mm a')}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{paddingBottom: "10px"}} >
            <Grid container justify='center' alignItems='center'>
              <i className={imgURL}/>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{paddingBottom: "10px"}} >
            <Grid container justify='center' alignItems='center'>
             <Typography variant='h4'>{degreeType === "celsius" ? celsius + "°C" : fahrenheit + "°F"}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{paddingBottom: "10px"}} >
            <Grid container justify='center' alignItems='center'>
             <Typography variant='body1'>{reading.weather[0].description}</Typography>
            </Grid>
          </Grid>
          </Grid>
        
      </Paper>
    )
  }
  
  export default DayCard;