import { Component } from 'react'
import { Login } from '../../cmps/auth/Login'
import { Signup } from '../../cmps/auth/Signup'

import './AuthPage.scss'

export class AuthPage extends Component {
  state = {
    authType: 'login',
  }

  onSwitchAuthType = () => {
    const { authType } = this.state
    const newAuthType = authType === 'login' ? 'signup' : 'login'
    this.setState({ authType: newAuthType })
  }

  render() {
    const { authType } = this.state
    return (
      <section className='auth-page flex justify-center'>
        {authType === 'login' && (
          <Login
            history={this.props.history}
            onSwitchAuthType={this.onSwitchAuthType}
          />
        )}
        {authType === 'signup' && (
          <Signup
            history={this.props.history}
            onSwitchAuthType={this.onSwitchAuthType}
          />
        )}
      </section>
    )
  }
}
