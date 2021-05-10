import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { socketService } from './services/socketService'
import { eventBusService } from './services/eventBusService'
import './assets/scss/main.scss'
import { loadLoggedInUser } from './store/actions/userActions'
import { AppHeader } from './cmps/AppHeader'
import { Notification } from './cmps/Notification'
import { HomePage } from './pages/HomePage'
import { ContactsPage } from './pages/ContactsPage'
import { ContactDetails } from './pages/ContactDetails'
import { ContactEdit } from './pages/ContactEdit'
import { PayPage } from './pages/PayPage'
import { StatisticsPage } from './pages/StatisticsPage'
import { AuthPage } from './pages/AuthPage/AuthPage'
export class _App extends React.Component {
  state = {
    currPage: 'home',
  }

  componentDidMount() {
    const { user } = this.props
    socketService.terminate()
    socketService.setup()
    if (user) {
      socketService.join(user._id)
    }
    socketService.on('notif', (data) => {
      eventBusService.emit('notif', data)
    })
    this.props.loadLoggedInUser()
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props
    if (!prevProps.user && user) {
      //loggedOut => loggedIn scanerio:
      socketService.terminate()
      socketService.setup()
      socketService.join(user._id)
      socketService.on('notif', (data) => {
        eventBusService.emit('notif', data)
      })
    } else if (prevProps.user && !user) {
      //loggedIn => loggedOut scanerio:
      socketService.terminate()
    }
  }

  get user() {
    return this.props.user
  }

  PrivateRoute = (props) => {
    if (this.user) {
      return <Route component={props.component} path={props.path} />
    } else {
      return <Redirect to='/auth' />
    }
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <AppHeader />
          <Notification />
          <main className='main-container'>
            <Switch>
              <Route component={AuthPage} path='/auth' />
              <this.PrivateRoute component={PayPage} path='/pay/:recieverId?' />
              <this.PrivateRoute
                component={ContactEdit}
                path='/contact/edit/:contactId?'
              />
              <this.PrivateRoute
                component={ContactDetails}
                path='/contact/:contactId'
              />
              <this.PrivateRoute
                component={StatisticsPage}
                path='/statistics'
              />
              <this.PrivateRoute component={ContactsPage} path='/contacts' />
              <this.PrivateRoute component={HomePage} path='/' />
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
})

const mapDispatchToProps = {
  loadLoggedInUser,
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
