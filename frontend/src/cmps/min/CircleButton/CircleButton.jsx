import './CircleButton.scss'

export const CircleButton = (props) => {
  return (
    <button
      {...props}
      className={`circle-button center-childs ${
        props.className ? props.className : ''
      }`}
    >
      {props.children}
    </button>
  )
}
