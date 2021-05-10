import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addContact } from '../../store/actions/userActions'
import { CircleButton } from '../../cmps/min/CircleButton'
import { ProfileImg } from '../../cmps/min/ProfileImg'
import editImg from '../../assets/img/edit.svg'
import payImg from '../../assets/img/pay.png'
import './ContactDetails.scss'
import { updateContact } from '../../services/userService'

export class _ContactDetails extends Component {
  get contact() {
    const { contactId } = this.props.match.params
    return this.props.user?.contacts.find(
      (currContact) => currContact.id == contactId
    )
  }

  render() {
    const { contact } = this
    return (
      <section className='contact-details-page flex justify-center'>
        <div className='page-content card flex column'>
          <h2>Contact details</h2>
          {contact && (
            <div>
              <ProfileImg imgUrl={contact.profileImgUrl} />
              <p>
                <strong>Contact Name:</strong> {contact.contactName}
              </p>
              <p>
                <strong>Username:</strong> {contact.username}
              </p>
            </div>
          )}
          {contact && (
            <div className='buttons-bar center-childs'>
              <CircleButton>
                <Link to={`/contact/edit/${contact.id}`}>
                  <img src={editImg} alt='' />
                </Link>
              </CircleButton>
              <CircleButton>
                <Link to={`/pay/${contact.userId}`}>
                  <img src={payImg} alt='' />
                </Link>
              </CircleButton>
            </div>
          )}
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
})

const mapDispatchToProps = {
  addContact,
  updateContact,
}

export const ContactDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactDetails)
