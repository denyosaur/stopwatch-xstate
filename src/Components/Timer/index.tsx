import React from 'react';
import { useMachine } from '@xstate/react';

import timerMachine from '../../machine';

const Timer: React.FC = () => {
  const [state, send] = useMachine(timerMachine);
  //const running = state.matches('running');
  const { time, laps } = state.context;

  // const handleLap = (): void => {
  //   send({ type: "LAP" });
  // }

  // const handleReset = (): void => {
  //   send({ type: "RESET" });
  // }

  const handleStart = (): void => {
    send({ type: "START" });
  }

  // const handleStop = (): void => {
  //   send({ type: "STOP" });
  // }
  const showTime = () => {
    console.log("time:", console.log(state.context.time))
  }

  return (
    <div>
      <button onClick={() => handleStart()}>Start</button>
      <button onClick={() => showTime()}>Reset</button>
      <div>
        {time}
      </div>
      <div>
        time:{time}
      </div>
    </div>
  )
}

export default Timer;
