import { ContactPreview } from '../ContactPreview'
import './ContactList.scss'

export function ContactList({ contacts }) {
  return (
    <ul className='contact-list clean-list flex column'>
      {contacts &&
        contacts.map((currContact) => (
          <ContactPreview key={currContact.id} contact={currContact} />
        ))}
    </ul>
  )
  //   return <ul className='contact-list'></ul>
}
