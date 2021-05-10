const INITIAL_STATE = {
  user: sessionStorage.getItem('loggedInUser')
    ? JSON.parse(sessionStorage.getItem('loggedInUser'))
    : null,
}
export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    case 'ADD_CONTACT':
      return {
        ...state,
        user: {
          ...state.user,
          contacts: [...state.user.contacts, action.contact],
        },
      }
    case 'UPDATE_CONTACT':
      return {
        ...state,
        user: {
          ...state.user,
          contacts: _getArrayWithUpdatedItem(
            state.user.contacts,
            action.contact,
            action.contactIdx
          ),
        },
      }
    case 'PAY':
      return {
        ...state,
        user: {
          ...state.user,
          coins: state.user.coins - action.quant,
        },
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.newUser,
      }

    default:
      return state
  }
}

function _getArrayWithUpdatedItem(arr, item) {
  const deepArr = JSON.parse(JSON.stringify(arr))
  const itemIdx = deepArr.findIndex((currItem) => currItem.id == item.id)
  if (itemIdx === -1) throw Error('couldnt find contact')
  deepArr.splice(itemIdx, 1, item)
  return deepArr
}
