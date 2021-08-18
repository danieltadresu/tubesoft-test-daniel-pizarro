import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MovingText from "react-moving-text";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles({
  title: {
    margin: "0",
    padding: "0",
    color: "white",
    fontSize: "3rem",
    fontFamily: "Avenir, Helvetica, Arial, sans-serif",
  },
  stopwatch: {
    margin: "0",
    padding: "0",
    color: "white",
    fontSize: "2rem",
    fontFamily: "Avenir, Helvetica, Arial, sans-serif",
  },
});

const Stopwatch = (props) => {
  const classes = useStyles();

  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [count, setCount] = useState(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    setCount(
      setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000)
    );
  };

  const handlePause = () => {
    clearInterval(count);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    setCount(
      setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000)
    );
  };

  const handleReset = () => {
    clearInterval(count);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const handleSubmit = async () => {
    setIsActive(false);
    const response = await fetch("http://localhost:80/stopwatch", {
      method: "POST",
      body: JSON.stringify({
        time: timer,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();
    handleReset();
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ paddingTop: "14rem" }}
      >
        <p className={classes.title}>
          <MovingText
            type="fadeInFromTop"
            duration="1000ms"
            delay="0s"
            direction="alternate"
            timing="ease-in"
            iteration="1"
            fillMode="forwards"
          >
            Stopwatch
          </MovingText>
        </p>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ paddingTop: "0rem" }}
      >
        <MovingText
          type="fadeIn"
          duration="1000ms"
          delay="0s"
          direction="normal"
          timing="ease-in-out"
          iteration="1"
          fillMode="none"
        >
          {isActive ? (
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              {!isPaused ? (
                <Button onClick={handleResume}>RESUME</Button>
              ) : (
                <Button onClick={handlePause}>PAUSE</Button>
              )}
              <Button onClick={handleSubmit}>SAVE</Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button onClick={handleStart}>START</Button>
              <Button
                onClick={() => props.setShowStopwatch(!props.showStopwatch)}
              >
                RECORDS
              </Button>
            </ButtonGroup>
          )}
        </MovingText>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ paddingTop: "1rem" }}
      >
        <MovingText
          type="fadeIn"
          duration="10000ms"
          delay="0s"
          direction="normal"
          timing="ease-in-out"
          iteration="1"
          fillMode="none"
        >
          <p className={classes.title}>{formatTime()}</p>
        </MovingText>
      </Grid>
    </>
  );
};

Stopwatch.propTypes = {
  showStopwatch: PropTypes.bool.isRequired,
  setShowStopwatch: PropTypes.func,
};

Stopwatch.defaultProps = {
  setShowStopwatch: () => {},
};

export default Stopwatch;
