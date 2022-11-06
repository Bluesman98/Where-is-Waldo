import "../styles/Box.css";

function Box(props) {
  const boxStyle = {
    top: props.y,
    left: props.x,
  };
  return <div className="Box" style={boxStyle}></div>;
}

export default Box;
