import { Component } from 'react'
import { connect } from 'react-redux'
import { getRate } from '../../services/bitcoinService'
import graphImg from '../../assets/img/big-graph.png'
import contactImg from '../../assets/img/contact.svg'
import payImg from '../../assets/img/pay-blue.png'
import arrow from '../../assets/img/back-arrow.png'
import './HomePage.scss'

class _HomePage extends Component {
  state = {
    rate: null,
  }

  async componentDidMount() {
    this.updateRateInState()
  }

  async componentDidUpdate(prevProps) {
    if (this.props.user && prevProps.user?.coins !== this.props.user.coins) {
      this.updateRateInState()
    }
  }

  updateRateInState = async () => {
    const { user } = this.props
    const rate = await getRate(user.coins)
    this.setState({ rate })
  }

  onFeatureClick = (to) => {
    this.props.history.push(to)
  }

  get valueInUSD() {
    const { user } = this.props
    const { rate } = this.state
    if (user && rate) {
      const btcInUSD = 1 / rate
      return btcInUSD * user.coins
    }
    return 'Loading...'
  }

  render() {
    const { user } = this.props
    return (
      <section className='home-page'>
        <div className='feature-grid'>
          <div className='grid-item center-childs flex column'>
            {user && <h3>Hello {user.username}</h3>}
            {user && <h3>Coins: {user.coins}</h3>}
            {user && (
              <h3>
                Value in USD:{' '}
                {Math.floor(this.valueInUSD).toLocaleString() + '$'}
              </h3>
            )}
          </div>
          <div
            className='grid-item card clickable column'
            onClick={() => this.onFeatureClick('/contacts')}
          >
            <div className='content fg-1 flex align-center'>
              <img src={contactImg} alt='Stats' width='48' />
              <p>Interact with your contacts, search for new contacts</p>
            </div>
            <button className='action-container flex align-center'>
              <p>Go to Contacts</p>
              <img src={arrow} alt='arrow' />
            </button>
          </div>
          <div
            className='grid-item card clickable column'
            onClick={() => this.onFeatureClick('/statistics')}
          >
            <div className='content fg-1 flex align-center'>
              <img src={graphImg} alt='Stats' width='48' />
              <p>All the market-information you need, stored in one page</p>
            </div>
            <button className='action-container flex align-center'>
              <p>Go to Statistics</p>
              <img src={arrow} alt='arrow' />
            </button>
          </div>
          <div
            className='grid-item card clickable column'
            onClick={() => this.onFeatureClick('/pay')}
          >
            <div className='content fg-1 flex align-center'>
              <img src={payImg} alt='Stats' width='48' />
              <p>Give / Request coins from your contacts around the globe</p>
            </div>
            <button className='action-container flex align-center'>
              <p>Go to Pay</p>
              <img src={arrow} alt='arrow' />
            </button>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
})

export const HomePage = connect(mapStateToProps)(_HomePage)
