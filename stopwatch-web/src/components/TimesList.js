import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

const useStyles = makeStyles({
  alert: {
    margin: "1rem",
  },
  title: {
    margin: "0",
    padding: "0",
    color: "white",
    fontSize: "1rem",
    fontFamily: "Avenir, Helvetica, Arial, sans-serif",
  },
});

const TimesList = () => {
  const classes = useStyles();
  const [allSavedTimes, setAllSavedTimes] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:80/stopwatch");
      const resData = await response.json();
      setAllSavedTimes(resData.data);
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
      style={{ paddingTop: "14rem" }}
    >
      {allSavedTimes &&
        allSavedTimes.map((timeData) => (
          <>
            <Alert
              variant="outlined"
              severity="info"
              className={classes.alert}
              key={timeData.id}
            >
              <AlertTitle>ID {timeData.id}</AlertTitle>
              <p className={classes.title}>
                Saved Time — <strong>{timeData.time}</strong>
              </p>
            </Alert>
          </>
        ))}
    </Grid>
  );
};

export default TimesList;
