import { useEffect, useState } from "react";
import Characters from "./Characters";
import "../styles/Map.css";

function Map(props) {
  const [mapData, setMapData] = useState([]);
  const [update, setUpdate] = useState(0);
  useEffect(() => {
    props
      .getData(props.db, "Map/" + props.item.name + "/characters")
      .then((value) => {
        setMapData(value);
        setTimeout(() => {
          setUpdate(1);
        }, 100);
      });
  }, [update]);

  return (
    <div
      className="Map"
      onClick={() => {
        /*props.getData(props.db, "Map/"+props.item.name+"/characters")
        .then((value) => {
          props.setData(value)
        })*/
        props.setData(mapData);
        props.setImg(props.item.img);
        props.setStart(1);
        props.setGameStart(true);
        props.setCurrentMap(props.item.name);
      }}
    >
      <img src={props.item.img}></img>
      <div className="find">Find :</div>
      <Characters data={mapData}></Characters>
    </div>
  );
}

export default Map;
