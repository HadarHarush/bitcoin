import { Component } from 'react'
import { BlockSize } from '../../cmps/charts/BlockSize'

import './StatisticsPage.scss'

export class StatisticsPage extends Component {
  render() {
    return (
      <section className='statistics-page flex justify-center'>
        <div className='page-content card fg-1 flex column'>
          <h2>Statistics</h2>
          <BlockSize />
        </div>
      </section>
    )
  }
}
