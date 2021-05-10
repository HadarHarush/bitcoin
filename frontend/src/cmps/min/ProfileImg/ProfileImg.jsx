import { Component } from 'react'

import './ProfileImg.scss'

export function ProfileImg({ imgUrl }) {
  return (
    <div className='profile-img center-childs'>
      <img src={imgUrl} />
    </div>
  )
}
