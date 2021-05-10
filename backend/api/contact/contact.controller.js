const contactService = require('./contact.service')
module.exports = {
  getContacts,
  addContact,
  updateContact,
  removeContact,
}

async function getContacts(req, res) {
  try {
    const { loggedInUser } = req.session
    const loggedInUserId = loggedInUser._id
    // const loggedInUserId = '606f15561e4bf041d8390a6e'
    const contacts = await contactService.getContacts(loggedInUserId)
    res.json(contacts)
  } catch (err) {
    res.status(500).send({ err: 'couldnt get contacts' })
  }
}

async function addContact(req, res) {
  try {
    const contactToAdd = req.body
    const { loggedInUser } = req.session
    const loggedInUserId = loggedInUser._id
    // const loggedInUserId = '606f15561e4bf041d8390a6e'
    const contact = await contactService.addContact(
      loggedInUserId,
      contactToAdd
    )
    res.json(contact)
  } catch (err) {
    res.status(500).send({ err: 'cannot add contact' })
  }
}

async function updateContact(req, res) {
  try {
    const contact = req.body
    const { loggedInUser } = req.session
    const loggedInUserId = loggedInUser._id
    // const loggedInUserId = '606f15561e4bf041d8390a6e'
    const updatedContact = await contactService.updateContact(
      loggedInUserId,
      contact
    )
    res.json(updatedContact)
  } catch (err) {
    res.status(500).send({ err: 'cannot update contact' })
  }
}

async function removeContact(req, res) {
  try {
    const { contactId } = req.params
    const { loggedInUser } = req.session
    const loggedInUserId = loggedInUser._id
    // const loggedInUserId = '606f15561e4bf041d8390a6e'
    const contact = await contactService.removeContact(
      loggedInUserId,
      contactId
    )
    res.json(contact)
  } catch (err) {
    res.status(500).send({ err: 'cannot add contact' })
  }
}
