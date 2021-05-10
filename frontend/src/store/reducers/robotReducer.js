const INITIAL_STATE = {
  robots: [],
  currRobot: null
}

export function robotReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'SET_ROBOTS':
      return {
        ...state,
        robots: action.robots
      }
    case 'SET_ROBOT':
      return {
        ...state,
        currRobot: action.robot
      }
    case 'ADD_ROBOT':
      return {
        ...state,
        robots: [...state.robots, action.robot]
      }
    case 'REMOVE_ROBOT':
      return {
        ...state,
        robots: state.robots.filter(robot => robot._id !== action.robotId)
      }
    case 'UPDATE_ROBOT':
      const { updatedRobot } = action
      return {
        ...state,
        robots: state.robots.map(robot => robot._id === updatedRobot._id ? updatedRobot : robot)
      }
    default:
      return state
  }
}