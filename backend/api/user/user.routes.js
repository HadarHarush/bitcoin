const express = require('express')
const userController = require('./user.controller')

const router = express.Router()

router.get('/username/:username', userController.getUserByUsername)
router.get('/search/:username', userController.getUsers)

router
  .route('/:userId')
  .get(userController.getUserById)
  .put(userController.updateUser)
router.route('/').post(userController.addUser)

module.exports = router
