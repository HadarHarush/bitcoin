import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { getUsers } from '../../services/userService'
import { eventBusService } from '../../services/eventBusService'
import { pay } from '../../store/actions/userActions'
import { InputBox } from '../../cmps/min/InputBox'
import { UsersList } from '../../cmps/min/UsersList'
import { CircleButton } from '../../cmps/min/CircleButton'
import { Loading } from '../../cmps/min/Loading'
import { Input, InputLabel } from '@material-ui/core'
import okImage from '../../assets/img/ok.svg'

import './PayPage.scss'

export const PayPage = ({ match, history }) => {
  const user = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()

  const [transatcion, handleChange] = useForm({
    recieverId: match.params.recieverId ? match.params.recieverId : '',
    quant: 0,
    reason: '',
  })
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState({ submit: false })

  useEffect(async () => {
    setUsers(await getUsers())
  }, [])

  const usersInContacts = users.filter((currUser) => {
    return user.contacts.find(
      (currContact) => currContact.userId === currUser._id
    )
  })

  const onSubmit = async (ev) => {
    ev.preventDefault()
    setLoading({ submit: true })
    try {
      if (!contact) {
        throw Error('Cannot pay to user that is not in your contacts')
      }
      await dispatch(pay(contact.userId, transatcion.quant))
      history.push(`/contact/${contact.id}`)
    } catch (err) {
      //todo: color the button backgrounfd in red
    } finally {
      setLoading({ submit: false })
    }
  }

  const contact = (() => {
    const { recieverId } = transatcion
    const res = user.contacts.find(
      (currContact) => currContact.userId === recieverId
    )

    return res ? res : null
  })()

  const { recieverId, quant, reason } = transatcion
  return (
    <section className='pay-page flex center-childs'>
      <div className='card flex align-center column'>
        <h2>Pay To Your Friends</h2>
        <p>
          For avoiding wastefulness, we let our users spend up to 25% of their
          money at the same transation
        </p>
        <form className='flex align-center column' onSubmit={onSubmit}>
          <div className='form-box flex column '>
            <InputBox>
              <InputLabel>User</InputLabel>
              <UsersList
                users={usersInContacts}
                name='recieverId'
                value={recieverId}
                handleChange={handleChange}
              />
            </InputBox>
            <div className='flex space-between'>
              <InputLabel>Coins</InputLabel>
              <strong>{quant}</strong>
              <input
                type='range'
                id='transactionRange'
                name='quant'
                min='0'
                max={user.coins / 4}
                value={quant}
                onChange={handleChange}
              />
            </div>
            <InputBox>
              <Input
                type='text'
                placeholder='Transaction reason'
                name='reason'
                value={reason}
                onChange={handleChange}
              />
            </InputBox>
            <CircleButton>
              {!loading.submit && <img src={okImage} alt='' />}
              {loading.submit && <Loading />}
            </CircleButton>
          </div>
        </form>
      </div>
    </section>
  )
}
