import "../styles/Characters.css";
function Characters(props) {
  //const [charactersData,setcharactersData] = useState(0)

  return (
    <div className="Characters">
      {props.data.map((item, i) => {
        return (
          <div key={i}>
            <img
              src={"../images/"+ item.name + ".png"}
            ></img>
            <div>{item.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Characters;
