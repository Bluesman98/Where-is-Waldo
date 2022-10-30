import '../styles/Dropdown.css'

function Dropdown(props) {
    console.log(props)

    const DropdownStyle = {
        top: props.y ,
        left: props.x 
    }
    function close(){
        props.close()
    }
    function handleClick(){
      
    }
    return (
      <div className='Dropdown' style={DropdownStyle}>
                  {props.data.map((item,i) => {
        return <button key={i} onClick={()=>{close()}}>{item.name}</button>;
      })}
      </div>
    );
  }
  
  export default Dropdown;