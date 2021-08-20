import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Grow from "@material-ui/core/Grow";
import MovingText from "react-moving-text";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  alert: {
    margin: ".6rem",
    [theme.breakpoints.between("xs", "sm", "md")]: {
      width: "80%",
    },
    [theme.breakpoints.between("md", "lg", "xl")]: {
      width: "40%",
    },
  },
  chip: {
    cursor: "pointer",
  },
  title: {
    margin: "0",
    padding: "0",
    color: "white",
    fontSize: "1rem",
    fontFamily: "Avenir, Helvetica, Arial, sans-serif",
  },
}));

const TimesList = (props) => {
  const classes = useStyles();
  const [allSavedTimes, setAllSavedTimes] = useState([]);
  const [checked, setChecked] = useState(false);

  const fetchData = async () => {
    try {
      // const response = await fetch("http://localhost:80/stopwatch");
      // const resData = await response.json();
      setChecked(true);
      setAllSavedTimes([
        {
          id: 1,
          time: 1,
        },
      ]);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ paddingTop: "10rem" }}
    >
      <MovingText
        type="fadeInFromTop"
        duration="1000ms"
        delay="0s"
        direction="alternate"
        timing="ease-in"
        iteration="1"
        fillMode="forwards"
      >
        <Chip
          label="ADD A NEW RECORD"
          className={classes.chip}
          onClick={() => props.setShowStopwatch(true)}
        />
      </MovingText>
      {allSavedTimes &&
        allSavedTimes.map((timeData) => (
          <>
            <Grow
              in={checked}
              style={{ transformOrigin: "0 0 0" }}
              {...(checked ? { timeout: 1000 } : {})}
            >
              <Alert
                variant="outlined"
                severity="info"
                className={classes.alert}
              >
                <p className={classes.title}>
                  <strong>{timeData.time}</strong>
                </p>
              </Alert>
            </Grow>
          </>
        ))}
    </Grid>
  );
};

TimesList.propTypes = {
  setShowStopwatch: PropTypes.func,
};

TimesList.defaultProps = {
  setShowStopwatch: () => {},
};

export default TimesList;
