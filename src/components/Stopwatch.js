import React, { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import "../styles/Stopwatch.css";

function Stopwatch(props) {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  useEffect(() => {
    if (props.stop === 1) {
      pause();
      props.setTime(hours * 3600 + minutes * 60 + seconds);
    }
    if (props.start === 1) {
      start();
      props.setStart(0);
    }
  });

  return (
    <div className="Stopwatch" style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default Stopwatch;
