import { Component } from 'react'

import { Line } from 'react-chartjs-2'

import './LineChart.scss'

export class LineChart extends Component {
  render() {
    const { data, options } = this.props
    return (
      <div className='chart'>
        <Line data={data} options={options} />
      </div>
    )
  }
}
