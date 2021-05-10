import { Component } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../../store/actions/userActions'
import { Loading } from '../../min/Loading'
import { CircleButton } from '../../min/CircleButton'
import { Input } from '@material-ui/core'
import okImage from '../../../assets/img/ok.svg'
import { eventBusService } from '../../../services/eventBusService'

import './Signup.scss'

export class _Signup extends Component {
  state = {
    username: '',
    password: '',
    fullname: 'MACH-PATCHA',
    mail: 'MachPatcha@gmail.com',
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
      ev.preventDefault()
      this.setState({
        ...this.state,
        loading: { ...this.state.loading, submit: true },
      })
      const { username, password, fullname, mail } = this.state
      await this.props.signup({ username, password, fullname, mail })
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

  render() {
    const { loading } = this.state
    const { onSwitchAuthType } = this.props
    return (
      <div className='signup card center-childs'>
        <form onSubmit={this.onSubmit} className='flex column justify-center'>
          <h2>Signup</h2>
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
            type='text'
            placeholder='password'
          />
          <Input
            value={this.state.fullname}
            onChange={this.handleChange}
            name='fullname'
            type='text'
            placeholder='fullname'
          />
          <Input
            value={this.state.mail}
            onChange={this.handleChange}
            name='mail'
            type='text'
            placeholder='mail'
          />
          <div className='bar center-childs'>
            <CircleButton>
              {!loading.submit && <img src={okImage} alt='' />}
              {loading.submit && <Loading />}
            </CircleButton>
            <p className='change-auth-type'>
              have an account? <a onClick={onSwitchAuthType}>Login</a>
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
  signup,
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)
