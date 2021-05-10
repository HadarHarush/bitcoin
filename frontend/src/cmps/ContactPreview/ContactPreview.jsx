import { Link } from 'react-router-dom'
import { ProfileImg } from '../min/ProfileImg'

import './ContactPreview.scss'

export function ContactPreview({ contact }) {
  return (
    <Link to={`/contact/${contact.id}`}>
      <li className='contact-preview flex align-center'>
        <ProfileImg imgUrl={contact.profileImgUrl} />
        <p className='fg-1'>
          {contact.contactName ? contact.contactName : contact.username}
        </p>
      </li>
    </Link>
  )
}
