import axios from 'axios'

export { getRate }

async function getRate() {
  const rate = await axios.get(
    `https://blockchain.info/tobtc?currency=USD&value=1`
  )
  return +rate.data
}
// async function getMarketPrice() {}
