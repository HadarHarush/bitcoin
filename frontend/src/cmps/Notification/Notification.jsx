import { Component } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { eventBusService } from '../../services/eventBusService'
import './Notification.scss'
toast.configure()

export class Notification extends Component {
  componentDidMount() {
    eventBusService.on('notif', this.notify)
  }

  notify = (notification) => {
    toast[notification.type](notification.txt)
  }

  render() {
    return <div className='notification'></div>
  }
}
