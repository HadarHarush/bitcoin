import { authService } from '../../services/authService'
import { eventBusService } from '../../services/eventBusService'
import {
  getUserById,
  addContact as addContactInService,
  updateContact as updateContactInService,
  pay as payInService,
  getEmptyContact,
  getUsers,
} from '../../services/userService'

export function login(username, password) {
  return async (dispatch) => {
    try {
      const user = await authService.login(username, password)
      dispatch({ type: 'LOGIN', user })
      eventBusService.emit('notif', {
        type: 'success',
        txt: `Welcome ${user.username}`,
      })
    } catch (err) {
      eventBusService.emit('notif', {
        type: 'error',
        txt: `Error while trying to log in`,
      })
    }
  }
}

export function signup(details) {
  return async (dispatch) => {
    try {
      const user = await authService.signup(details)
      dispatch({ type: 'LOGIN', user })
      eventBusService.emit('notif', {
        type: 'success',
        txt: `Welcome ${user.username}`,
      })
    } catch (er) {
      eventBusService.emit('notif', {
        type: 'error',
        txt: `Error while trying to sign up`,
      })
    }
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      await authService.logout()
      dispatch({ type: 'LOGOUT' })
    } catch (err) {
      eventBusService.emit('notif', {
        type: 'error',
        txt: `Error while trying to log out`,
      })
    }
  }
}

export function loadLoggedInUser() {
  return async (dispatch) => {
    try {
      const sessionLoggedInUser = sessionStorage.getItem('loggedInUser')
        ? JSON.parse(sessionStorage.getItem('loggedInUser'))
        : null
      if (!sessionLoggedInUser) return
      const userId = sessionLoggedInUser._id
      const updatedUser = await getUserById(userId)
      dispatch({ type: 'LOGIN', user: updatedUser })
    } catch (err) {
      eventBusService.emit('notif', {
        type: 'error',
        txt: `Error while trying to refresh your user. please refresh the page`,
      })
    }
  }
}

export function addContact(contact) {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().userReducer

      //validation:
      if (user._id === contact.userId) {
        throw Error('Cannot add youreslf as a contact')
      }
      user.contacts.forEach((currContact) => {
        if (currContact.contactName === contact.contactName) {
          throw Error(
            `The contact name ${contact.contactName} is taken. Please choose another name`
          )
        }
        if (currContact.username === contact.username) {
          throw Error('Cannot add more than one contact for same user')
        }
      })

      const updatedContact = await addContactInService(contact)
      dispatch({ type: 'ADD_CONTACT', contact: updatedContact })
      eventBusService.emit('notif', {
        type: 'success',
        txt: `${contact.contactName} has added to your contacts`,
      })
    } catch (err) {
      eventBusService.emit('notif', {
        type: 'error',
        txt: `${err.message}`,
      })
      throw err
    }
  }
}

export function updateContact(contact) {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().userReducer
      user.contacts.forEach((currContact) => {
        if (
          currContact.contactName === contact.contactName &&
          currContact.id !== contact.id
        ) {
          throw Error(
            `The contact name ${contact.contactName} is taken. Please choose another name`
          )
        }
      })
      const updatedContact = await updateContactInService(contact)
      dispatch({ type: 'UPDATE_CONTACT', contact: updatedContact })
      eventBusService.emit('notif', {
        type: 'success',
        txt: `updated ${contact.contactName} in your contacts`,
      })
    } catch (err) {
      eventBusService.emit('notif', {
        type: 'error',
        txt: `${err.message}`,
      })
      throw err
    }
  }
}

export function pay(recieverId, quant) {
  return async (dispatch) => {
    try {
      const reciever = await getUserById(recieverId)
      await payInService(recieverId, quant)
      dispatch({ type: 'PAY', quant })
      eventBusService.emit('notif', {
        type: 'success',
        txt: `Transfered ${quant} coins to ${reciever.username}`,
      })
    } catch (err) {
      eventBusService.emit('notif', {
        type: 'error',
        txt: `Error while trying to pay`,
      })
      throw err
    }
  }
}

export function setUser(newUser) {
  return (dispatch) => {
    dispatch({ type: 'SET_USER', newUser })
  }
}
