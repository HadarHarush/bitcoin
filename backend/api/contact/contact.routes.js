const express = require('express')
const contactController = require('./contact.controller')

const router = express.Router()

router
  .route('/:contactId')
  .put(contactController.updateContact)
  .delete(contactController.removeContact)

router
  .route('/')
  .get(contactController.getContacts)
  .post(contactController.addContact)

// router
//   .route('/:userId')
//   .get(userController.getUserById)
//   .put(userController.updateUser)

module.exports = router
