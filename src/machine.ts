import { createMachine, assign } from 'xstate';

const timerMachine = createMachine({
  id: 'stopwatch',
  initial: 'idle',
  context: {
    time: 0 as number,
    laps: [] as number[],
  },
  states: {
    idle: {
      on: {
        START: 'running',
      },
    },
    running: {
      entry: 'startTimer',
      on: {
        STOP: 'idle',
        LAP: {
          actions: 'addLap',
        },
      },
      activities: ['runTime'],
    },
  },
  on: {
    RESET: {
      target: 'idle',
      actions: 'resetTimer',
    },
    INCREMENT: {
      actions: assign({
        time: (context) => context.time + 1,
      }),
    }
  },
}, {
  actions: {
    increment: assign({
      time: context => context.time += 1,
    }),
    addLap: assign({
      laps: (context) => [...context.laps, context.time],
    }),
    resetTimer: assign({
      time: 0,
      laps: [],
    }),
  },
  activities: {
    runTime: (context) => {
      const interval = window.setInterval(() => {
        assign({ time: context.time += 1 })
        console.log(assign)
        // context.time = context.time + 1
        console.log(context.time)
      }, 1000);
      return () => clearInterval(interval);
    }
  }
});


export default timerMachine;
