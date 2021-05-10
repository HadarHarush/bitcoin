import { Select, MenuItem } from '@material-ui/core'
import { ProfileImg } from '../ProfileImg'
import './UsersList.scss'

export const UsersList = ({ users, handleChange, name, value, disabled }) => {
  return (
    <Select
      name={name ? name : ''}
      value={value ? value : ''}
      onChange={handleChange}
      disabled={disabled}
    >
      {users &&
        users.map((currUser) => (
          <MenuItem key={currUser._id} value={currUser._id}>
            <div className='select-item flex space-between align-center'>
              <p>{currUser.username}</p>
              <ProfileImg imgUrl={currUser.profileImgUrl} />
            </div>
          </MenuItem>
        ))}
    </Select>
  )
}
