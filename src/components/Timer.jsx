import React, {useState, useEffect, Fragment} from 'react';
import "./styles/Timer.css"

const Timer = ({startDate, endDate, status}) => {

    const [timerDays, setTimerDays] = useState(0);
    const [timerHours, setTimerHours] = useState(0);
    const [timerMinutes, setTimerMinutes] = useState(0);

    let interval;

const startTimer = () => {

    const countStartDate = new Date(startDate).getTime();

    interval = setInterval(()=>{
        const now = new Date().getTime();
        
        const distance = countStartDate - now;

        const days = Math.floor(distance / (24 * 60 * 60 * 1000));
        const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));

        if(distance < 0){
            // Stop Timer
            clearInterval(interval.current);
        }
        else{
            // Update Timer
            setTimerDays(days);
            setTimerHours(hours);
            setTimerMinutes(minutes);
        }

    })
}

useEffect(() => {
 startTimer();
})

let flag = true;
if(status === "Ended on"){
    flag = false;
}else{
    flag = true;
}

  return (
    <Fragment>
      <section className="timer-container">
        <section className="timer">
          <div className="clock">
            <h6>{status}</h6>
            {flag ? (
              <>
                {" "}
                <section>
                  <p>{timerDays}</p>
                  <small>Days</small>
                </section>
                <span>:</span>
                <section>
                  <p>{timerHours}</p>
                  <small>Hours</small>
                </section>
                <span>:</span>
                <section>
                  <p>{timerMinutes}</p>
                  <small>Mins</small>
                </section>
              </>
            ) : (
              <section>
                <p>{endDate}</p>
              </section>
            )}
          </div>
        </section>
      </section>
    </Fragment>
  );
}

export default Timer;