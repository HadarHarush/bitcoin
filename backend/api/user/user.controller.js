const userService = require('./user.service')

async function getUserById(req, res) {
  try {
    const { userId } = req.params
    const user = await userService.getUserById(userId)
    res.json(user)
  } catch (err) {
    res.status(500).send({ err: 'user didnt found' })
  }
}

async function getUserByUsername(req, res) {
  try {
    const { username } = req.params
    console.log('username:', username)
    const user = await userService.getUserByUsername(username)
    res.json(user)
  } catch (err) {
    res.status(500).send({ err: 'user didnt found' })
  }
}

async function getUsers(req, res) {
  try {
    const { username } = req.params
    const users = await userService.getUsers(username)
    res.json(users)
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'couldnt search users' })
  }
}

async function addUser(req, res) {
  try {
    const userToAdd = req.body
    const user = await userService.addUser(userToAdd)
    res.json(user)
  } catch (err) {
    res.status(500).send({ err: 'cannot add user' })
  }
}

async function updateUser(req, res) {
  try {
    const newUser = req.body
    const updatedUser = await userService.updateUser(newUser)
    res.json(updatedUser)
  } catch (err) {
    res.status(500).send({ err: 'cannot update user' })
  }
}

module.exports = {
  getUserById,
  getUserByUsername,
  addUser,
  updateUser,
  getUsers,
}
