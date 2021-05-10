import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { getUsers, getEmptyContact } from '../../services/userService'
import { eventBusService } from '../../services/eventBusService'
import {
  addContact,
  setUser,
  updateContact,
} from '../../store/actions/userActions'
import { InputBox } from '../../cmps/min/InputBox'
import { UsersList } from '../../cmps/min/UsersList'
import { Loading } from '../../cmps/min/Loading'
import { CircleButton } from '../../cmps/min/CircleButton'
import { Input, InputLabel } from '@material-ui/core'
import okImg from '../../assets/img/ok.svg'

import './ContactEdit.scss'

export const ContactEdit = ({ match, history }) => {
  const user = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()

  const [contact, handleChange, setContact] = useForm(getEmptyContact())
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState({ submit: false })

  useEffect(async () => {
    const { contactId } = match.params
    let preContact = user.contacts.find(
      (currContact) => currContact.id === contactId
    )
    if (preContact) setContact(preContact)
    try {
      let preUsers = await getUsers()
      const contactsIds = user.contacts.map((currContact) => currContact.userId)
      setUsers(
        preUsers.filter((currUser) => {
          return (
            !contactsIds.includes(currUser._id) && user._id !== currUser._id
          )
        })
      )
    } catch (err) {
      eventBusService.emit('notif', {
        type: 'error',
        txt: `Couldnt load users`,
      })
    }
  }, [])

  const onSaveContact = async (ev) => {
    ev.preventDefault()
    setLoading({ ...loading, submit: true })
    try {
      if (contact.id) {
        //edit contact...
        await dispatch(updateContact(contact))
      } else {
        //add contact...
        const contactUser = users.find(
          (currUser) => currUser._id === contact.userId
        )
        await dispatch(
          addContact({
            ...contact,
            username: contactUser.username,
            userId: contactUser._id,
            profileImgUrl: contactUser.profileImgUrl,
          })
        )
      }
      history.push('/contacts')
    } catch (err) {
      //todo: add red background to button for one second
    } finally {
      setLoading({ ...loading, submit: false })
    }
  }

  if (!contact) return <div>{'Loading...'}</div>
  const { userId, contactName } = contact
  return (
    <section className='contact-edit flex justify-center'>
      <form
        className='contact-edit card flex column justify-center'
        onSubmit={onSaveContact}
      >
        <h2>Contact {contact?.id ? 'Edit' : 'Add'}</h2>
        <InputBox>
          <InputLabel>User</InputLabel>
          <UsersList
            users={users}
            name='userId'
            value={userId}
            handleChange={handleChange}
            disabled={contact?.id && true}
          />
        </InputBox>

        <InputBox>
          <InputLabel htmlFor='contactName'>Contact Name</InputLabel>
          <Input
            required
            type='text'
            id='contactName'
            value={contactName}
            onChange={handleChange}
            name='contactName'
          />
        </InputBox>
        <CircleButton>
          {!loading.submit && <img src={okImg} alt='' />}
          {loading.submit && <Loading />}
        </CircleButton>
      </form>
      {/* <p>{JSON.stringify(user)}</p>
      <button
        onClick={() => {
          const newUser = { ...user, con: 'gdfgdf' }
          dispatch(setUser(newUser))
        }}
      >
        change
      </button> */}
    </section>
  )
}
