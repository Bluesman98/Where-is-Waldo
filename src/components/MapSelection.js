import "../styles/MapSelection.css";
import Map from "./Map";

function MapSelection(props) {
  return (
    <div className="MapSelection">
      {props.collection.map((item, i) => {
        return (
          <Map
            key={i}
            db={props.db}
            item={item}
            getData={props.getData}
            setData={props.setData}
            setImg={props.setImg}
            setStart={props.setStart}
            setGameStart={props.setGameStart}
            setCurrentMap={props.setCurrentMap}
          ></Map>
        );
      })}
    </div>
  );
}

export default MapSelection;
