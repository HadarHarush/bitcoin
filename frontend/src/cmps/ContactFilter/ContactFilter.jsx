import { Component } from 'react'
import { Input } from '@material-ui/core'

import './ContactFilter.scss'

export class ContactFilter extends Component {
  state = {
    txt: '',
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    this.setState({ [field]: value }, () => {
      this.props.onFilterChange({ ...this.state })
    })
  }

  render() {
    return (
      <div className='contact-filter-box flex column'>
        <Input
          type='text'
          name='txt'
          value={this.state.txt}
          onInput={this.handleChange}
          placeholder='Search'
        />
      </div>
    )
  }
}
