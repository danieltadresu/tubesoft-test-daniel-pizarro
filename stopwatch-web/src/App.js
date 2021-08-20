import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stopwatch from "./components/Stopwatch";
import TimesList from "./components/TimesList";

const useStyles = makeStyles({
  root: {
    background: "#131414",
    width: "100%",
    height: "100vh",
    margin: "0",
    padding: "0",
  },
});

const App = () => {
  const classes = useStyles();
  const [showStopwatch, setShowStopwatch] = useState(true);

  return (
    <div className={classes.root}>
      {showStopwatch ? (
        <Stopwatch
          showStopwatch={showStopwatch}
          setShowStopwatch={setShowStopwatch}
        />
      ) : (
        <TimesList setShowStopwatch={setShowStopwatch} />
      )}
    </div>
  );
};

export default App;
