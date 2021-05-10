const dbService = require('../../services/db.service')
const userService = require('../../api/user/user.service')
const socketService = require('../../services/socket.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
}

async function getContacts(userId) {
  try {
    const user = await userService.getUserById(userId)
    return user.contacts
  } catch (err) {
    console.log('couldnt get contacts: ', err)
    throw err
  }
}

async function getContactById(userId, contactId) {
  try {
    const user = await userService.getUserById(userId)
    const contact = user.contacts.find(
      (currContact) => currContact.id === contactId
    )
    return contact
  } catch (err) {
    console.log('couldnt get contact: ', err)
    throw err
  }
}

async function addContact(userId, contact) {
  try {
    const user = await userService.getUserById(userId)
    user.contacts.push(contact)
    await userService.updateUser(user)
    socketService.emitToRoom(
      'notif',
      {
        txt: `${user.username} added you to his contacts`,
        type: 'success',
      },
      contact.userId
    )
    return contact
  } catch (err) {
    console.log('couldnt add contact: ', err)
    throw err
  }
}

async function updateContact(userId, contact) {
  try {
    const user = await userService.getUserById(userId)
    const contactIdx = user.contacts.findIndex(
      (currContact) => currContact.id == contact.id
    )
    if (contactIdx === -1) throw Error('couldnt find contact')
    user.contacts.splice(contactIdx, 1, contact)
    await userService.updateUser(user)
    return contact
  } catch (err) {
    console.log('couldnt update contact: ', err)
    throw err
  }
}

async function removeContact(userId, contactId) {
  try {
    const user = await userService.getUserById(userId)
    user.contacts = user.contacts.filter(
      (currContact) => currContact.id !== contactId
    )
    await userService.updateUser(user)
    return 'deleted'
  } catch (err) {
    console.log('couldnt delete contact: ', err)
    throw err
  }
}
