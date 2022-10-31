import React from 'react';
import ReactDOM from 'react-dom';
import "../styles/Dropdown.css";

function Dropdown(props) {

  const DropdownStyle = {
    top: props.y,
    left: props.x,
  };

  function handleClick(item) {
    console.log(props.targetValidation(item.x, item.y + document.querySelector('.Stopwatch').clientHeight))
   if(props.targetValidation(item.x, item.y + document.querySelector('.Stopwatch').clientHeight)) {
     props.removeFromList(item.name);
     let parent = document.querySelector('.App' )
     let box = document.createElement('div')
     box.classList.add('target-valid')
     box.style.top = props.y + 'px'
     box.style.left = props.x + 'px'
     parent.appendChild(box)
     console.log('append')
}
    props.close();
  }

 

  return (
    <div className="Dropdown" style={DropdownStyle}>
      {props.data.map((item, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              handleClick(item);
            }}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
}

export default Dropdown;
