const initialState = {
  isPlaying: false,
  elapsedTime: 0,
  timerDuration: 1500, // 25 минут в секундах
};

const START_TIMER = 'START_TIMER';
const RESTART_TIMER = 'RESTART_TIMER';
const ADD_SECOND = 'ADD_SECOND';

function reducer(state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      return { ...state, isPlaying: true };
    case RESTART_TIMER:
      return { ...state, isPlaying: false, elapsedTime: 0 };
    case ADD_SECOND:
      if (state.elapsedTime < state.timerDuration) {
        return { ...state, elapsedTime: state.elapsedTime + 1 };
      } else {
        return { ...state, isPlaying: false };
      }
    default:
      return state;
  }
}

export default reducer;
