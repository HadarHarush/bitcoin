import { httpService } from './httpService'
import { makeId } from './utilService'

export {
  getUserById,
  getUserByUsername,
  getUsers,
  addContact,
  updateContact,
  getEmptyContact,
  pay,
}

async function getUserById(userId = '606f15561e4bf041d8390a6e') {
  return await httpService.get(`user/${userId}`)
}

async function getUserByUsername(username) {
  try {
    return await httpService.get(`user/username/${username}`)
  } catch (err) {
    return null
  }
}

async function getUsers(usernameFilter) {
  return await httpService.get(`user/search/${usernameFilter}`)
}

async function addContact(contact) {
  contact.id = makeId()
  await httpService.post('contact', contact)
  const prevLoggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
  prevLoggedInUser.contacts.push(contact)
  sessionStorage.setItem('loggedInUser', JSON.stringify(prevLoggedInUser))
  return contact
}

async function updateContact(contact) {
  await httpService.put(`contact/${contact.id}`, contact)
  const prevLoggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
  const contactIdx = prevLoggedInUser.contacts.findIndex(
    (currContact) => currContact.id == contact.id
  )
  if (contactIdx === -1) throw Error('couldnt find contact')
  prevLoggedInUser.contacts.splice(contactIdx, 1, contact)
  sessionStorage.setItem('loggedInUser', JSON.stringify(prevLoggedInUser))
  return contact
}

function getEmptyContact() {
  return {
    username: '',
    contactName: '',
  }
}

async function pay(recieverId, quant) {
  await httpService.post('transaction', { recieverId, quant })
  const prevLoggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
  prevLoggedInUser.coins -= quant
  sessionStorage.setItem('loggedInUser', JSON.stringify(prevLoggedInUser))
  return quant
}
