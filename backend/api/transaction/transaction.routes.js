const express = require('express')
const transationController = require('./transaction.controller')

const router = express.Router()

router.post('', transationController.pay)

module.exports = router
