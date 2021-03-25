import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Select from 'react-select';
import { langOptions } from './language';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  select: {
    width: '150px',
    color: '#000'
  }
}));

export default function MenuBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Weather App
          </Typography>
          { props.selectLang ?
           <Select options={langOptions}
                  defaultValue={langOptions[17]}
                  className={classes.select}
                  isSearchable='true'
                  onChange={props.handleChangelang}
            /> :
           <Button color="inherit" onClick={props.handleClick} >Login</Button>
          }
          
        </Toolbar>
      </AppBar>
    </div>
  );
}