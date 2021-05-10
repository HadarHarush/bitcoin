import { robotService } from '../../services/robotService'

// Thunk - Action Dispatcher
export function loadRobots(filterBy) {
  return async dispatch => {
    const robots = await robotService.query(filterBy)
    const action = {
      type: 'SET_ROBOTS',
      robots
    }
    dispatch(action)
  }
}

export function getRobotById(robotId) {
  return async dispatch => {
    const robot = await robotService.getById(robotId)
    dispatch({ type: 'SET_ROBOT', robot })
  }
}
export function saveRobot(robot) {
  return async dispatch => {
    const isAdd = !robot._id
    const updatedRobot = await robotService.save(robot)

    if (isAdd) dispatch({ type: 'ADD_ROBOT', robot: updatedRobot })
    else dispatch({ type: 'UPDATE_ROBOT', updatedRobot })
  }
}
export function tryRobot(robotId) {
  return async dispatch => {
    const updatedRobot = await robotService.tryRobot(robotId)
    dispatch({ type: 'SET_ROBOT', robot: updatedRobot })
  }
}
export function chargeRobot(robotId, chargeAmount) {
  return async (dispatch, getState) => {
    const spendAmount = chargeAmount * 0.5

    const userBalance = getState().userReducer.user.balance
    if (userBalance < spendAmount) return alert('Not enough balance!')

    const updatedRobot = await robotService.chargeRobot(robotId, chargeAmount)
    dispatch({ type: 'SPEND_BALANCE', spendAmount })
    dispatch({ type: 'SET_ROBOT', robot: updatedRobot })
  }
}
export function removeRobot(robotId) {
  return async dispatch => {
    await robotService.remove(robotId)
    dispatch({ type: 'REMOVE_ROBOT', robotId })
  }
}