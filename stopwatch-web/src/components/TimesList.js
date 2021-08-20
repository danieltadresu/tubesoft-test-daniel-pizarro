import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Grow from "@material-ui/core/Grow";

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
  title: {
    margin: "0",
    padding: "0",
    color: "white",
    fontSize: "1rem",
    fontFamily: "Avenir, Helvetica, Arial, sans-serif",
  },
}));

const TimesList = () => {
  const classes = useStyles();
  const [allSavedTimes, setAllSavedTimes] = useState([]);
  const [checked, setChecked] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:80/stopwatch");
      const resData = await response.json();
      setChecked(true);
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

export default TimesList;
