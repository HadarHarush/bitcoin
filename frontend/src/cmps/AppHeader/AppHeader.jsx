import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/userActions'
import { CircleButton } from '../min/CircleButton'
import { ProfileImg } from '../../cmps/min/ProfileImg'
import logoImg from '../../assets/img/logo.svg'
import homeImg from '../../assets/img/home.svg'
import contactImg from '../../assets/img/contact.svg'
import graphImg from '../../assets/img/graph.png'
import backArrowImg from '../../assets/img/back-arrow.png'
import exitImg from '../../assets/img/exit.png'
import './AppHeader.scss'

function _AppHeader({ history, logout, user }) {
  const onLogOut = async () => {
    logout()
  }

  return (
    <header className='app-header'>
      <div className='main-container flex space-between'>
        <a className='logo align-center'>
          <img src={logoImg} alt='' />
        </a>
        <div className='nav-container flex align-center'>
          <nav className='main-nav flex align-center'>
            <CircleButton>
              <NavLink
                className='center-childs circle-button classic-hover-effect'
                exact
                to='/'
                activeClassName='active'
              >
                <img src={homeImg} alt='' />
              </NavLink>
            </CircleButton>

            <CircleButton>
              <NavLink
                className='center-childs circle-button classic-hover-effect'
                to='/contacts'
                activeClassName='active'
              >
                <img src={contactImg} alt='' />
              </NavLink>
            </CircleButton>

            <CircleButton>
              <NavLink
                className='center-childs circle-button classic-hover-effect'
                to='/statistics'
                activeClassName='active'
              >
                <img src={graphImg} alt='' />
              </NavLink>
            </CircleButton>
          </nav>
          {user && (
            <div className='user-bar flex space-between align-center'>
              <ProfileImg imgUrl={user.profileImgUrl} />
              <CircleButton onClick={onLogOut}>
                <img src={exitImg} alt='' />
              </CircleButton>
            </div>
          )}
        </div>
      </div>
      <div className='back-button-container main-container flex'>
        <CircleButton onClick={() => history.goBack()}>
          <img src={backArrowImg} />
        </CircleButton>
      </div>
    </header>
  )
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
})

const mapDispatchToProps = {
  logout,
}

export const AppHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(_AppHeader))
