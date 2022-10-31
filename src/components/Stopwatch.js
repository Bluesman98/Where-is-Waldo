import React, { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import '../styles/Stopwatch.css'

function Stopwatch(props) {

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  useEffect(()=>{
    if(props.stop === 1) pause()
  })
   
  return (
    <div className = 'Stopwatch' style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
       <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default Stopwatch
