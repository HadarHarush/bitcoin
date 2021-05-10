import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ContactFilter } from '../../cmps/ContactFilter'
import { ContactList } from '../../cmps/ContactList'
import { CircleButton } from '../../cmps/min/CircleButton'
import plusImg from '../../assets/img/plus.png'
import './ContactsPage.scss'

export class _ContactsPage extends Component {
  state = {
    filter: null,
  }

  async componentDidMount() {}

  get contacts() {
    return this.props.user?.contacts
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  get contactsToShow() {
    const { contacts } = this
    if (!contacts) return null

    let res = JSON.parse(JSON.stringify(contacts))
    const { filter } = this.state
    if (!filter) return res
    //filterByText:
    res = res.filter(
      (currContact) =>
        currContact.username.toLowerCase().includes(filter.txt.toLowerCase()) ||
        currContact.contactName.toLowerCase().includes(filter.txt.toLowerCase())
    )
    return res
  }

  render() {
    const { contacts } = this
    return (
      <section className='contacts-page'>
        <div className='page card flex column'>
          <h2>Contacts</h2>
          <div className='page-content flex'>
            <div className='contacts-list-container flex column'>
              <ContactFilter onFilterChange={this.onFilterChange} />
              <div className='contacts-container'>
                {contacts && <ContactList contacts={this.contactsToShow} />}
              </div>
            </div>
            <div className='add-contact-container fg-1 center-childs'>
              <CircleButton className='add-contact-button'>
                <Link className='center-childs' to='/contact/edit'>
                  <img src={plusImg} alt='' />
                </Link>
              </CircleButton>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
})

export const ContactsPage = connect(mapStateToProps)(_ContactsPage)
