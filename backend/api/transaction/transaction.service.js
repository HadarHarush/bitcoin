const dbService = require('../../services/db.service')
const utilService = require('../../services/util.service')
const socketService = require('../../services/socket.service')
const { emit, emitToRoom } = require('../../services/socket.service')
const ObjectId = require('mongodb').ObjectId

const USER_KEY = 'user'

module.exports = {
  pay,
}

async function pay(userId, recieverId, quant) {
  try {
    const collection = await dbService.getCollection(USER_KEY)
    const user = await collection.findOne({ _id: ObjectId(userId) })
    if (user.coins / 4 < quant)
      throw Error('cannot pay more than your transaction limit')
    if (quant < 0) throw Error('cannot Pay negative amount of money')

    const reciever = await collection.findOne({ _id: ObjectId(recieverId) })
    await collection.update(
      { _id: ObjectId(userId) },
      { $set: { coins: user.coins - quant } }
    )
    await collection.update(
      { _id: ObjectId(recieverId) },
      { $set: { coins: reciever.coins + quant } }
    )
    socketService.emitToRoom(
      'notif',
      {
        txt: `${user.username} sent you ${quant} coins!`,
        type: 'success',
      },
      recieverId
    )

    return quant
  } catch (err) {
    console.log('couldnt pay: ', err)
    throw err
  }
}
