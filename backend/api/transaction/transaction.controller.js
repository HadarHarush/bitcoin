const transictionService = require('./transaction.service')

module.exports = {
  pay,
}

async function pay(req, res) {
  try {
    const { loggedInUser } = req.session
    const loggedInUserId = loggedInUser._id
    // const loggedInUserId = '606f15561e4bf041d8390a6e'
    const { recieverId, quant } = req.body
    const quantRes = await transictionService.pay(
      loggedInUserId,
      recieverId,
      quant
    )
    if (quant !== quantRes) throw Error('unknow')
    res.json(quantRes)
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'couldnt Pay' })
  }
}
