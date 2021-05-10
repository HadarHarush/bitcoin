import './InputBox.scss'

export const InputBox = (props) => {
  return (
    <div
      {...props}
      className={`input-box flex align-center ${
        props.className ? props.className : ''
      }`}
    >
      {props.children}
    </div>
  )
}
