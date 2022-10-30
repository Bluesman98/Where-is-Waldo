import '../styles/Box.css'

function Box(props) {

    const boxStyle = {
        top: props.y ,
        left: props.x
    }
    console.log(props)
    return (
      <div className='Box' style={boxStyle}>
      </div>
    );
  }
  
  export default Box;