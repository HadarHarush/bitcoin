import { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../../store/actions/userActions'
import { CircleButton } from '../../min/CircleButton'
import { Loading } from '../../min/Loading'
import { Input, Button } from '@material-ui/core'
import okImage from '../../../assets/img/ok.svg'
import { eventBusService } from '../../../services/eventBusService'

import './Login.scss'

class _Login extends Component {
  state = {
    username: '',
    password: '',
    loading: {
      submit: false,
    },
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    this.setState({ [field]: value })
  }

  onSubmit = async (ev) => {
    try {
      if (ev) {
        ev.preventDefault()
      }
      this.setState({
        ...this.state,
        loading: { ...this.state.loading, submit: true },
      })
      await this.props.login(this.state.username, this.state.password)
      this.setState({
        ...this.state,
        loading: { ...this.state.loading, submit: false },
      })
      this.props.history.push('/')
    } catch (err) {
      this.setState({
        ...this.state,
        loading: { ...this.state.loading, submit: false },
      })
      eventBusService.emit('notif', {
        type: 'error',
        txt: err.message,
      })
    }
  }

  onGuestClick = () => {
    this.setState(
      { ...this.state, username: 'guest', password: 'guest' },
      this.onSubmit
    )
    // this.onSubmit()
  }

  render() {
    const { loading } = this.state
    const { onSwitchAuthType } = this.props
    return (
      <div className='login card center-childs'>
        <form onSubmit={this.onSubmit} className='flex column justify-center'>
          <h2>Login</h2>
          <Input
            value={this.state.username}
            onChange={this.handleChange}
            name='username'
            type='text'
            placeholder='username'
          />
          <Input
            value={this.state.password}
            onChange={this.handleChange}
            name='password'
            type='password'
            placeholder='password'
          />
          <Button
            variant='contained'
            color='primary'
            onClick={this.onGuestClick}
          >
            Guest
          </Button>
          <div className='bar center-childs'>
            <CircleButton>
              {!loading.submit && <img src={okImage} alt='' />}
              {loading.submit && <Loading />}
            </CircleButton>
            <p className='change-auth-type'>
              Don't have an account? <a onClick={onSwitchAuthType}>Signup</a>
            </p>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
})

const mapDispatchToProps = {
  login,
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)
