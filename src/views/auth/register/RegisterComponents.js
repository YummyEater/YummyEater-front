import React, { useState, useEffect } from "react";

export const Timer = (props) => {
  const [time, setTimer] = useState({ min: 0, sec: 0 });
  const [stopped, setStopped] = useState(false);

  // 5분 타이머 시작, 재시작
  useEffect(() => {
    setTimer({ min: 5, sec: 0 })
  }, [props.run])

  useEffect(() => {
    const countdown = setInterval(() => {
      if (time.sec > 0) { setTimer({ min: time.min, sec: time.sec - 1 }) }
      if (time.sec === 0) {
        if (time.min === 0) { clearInterval(countdown); } 
        else { setTimer({ min: time.min - 1, sec: 59 }) }
      }
    }, 1000);

    if(props.verified === true) {
      clearInterval(countdown);
      setStopped(true);
    }

    return () => clearInterval(countdown);
  }, [time, props.verified]);

  return (
    <div className={stopped ? "text-gray3" : "text-danger-red"}>
      {time.min}:{(time.sec < 10) ? `0${time.sec}` : time.sec}
    </div>
  );

};