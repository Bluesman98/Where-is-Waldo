import { useEffect, useState } from "react";
import "../styles/Leaderboard.css";

function Leaderboard(props) {
  const [player_name, setPlayer_name] = useState("");
  const [date, setDate] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setDate(format(props.time));
  }, [props.stop]);

  const handleChange = (event) => {
    setPlayer_name(event.target.value);
  };

  function format(seconds) {
    let date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substring(11, 19);
  }

  function submitScore() {
    let path = "Map/" + String(props.currentMap) + "/leaderboard";
    props.submitScore(player_name, props.time, path);
    props.updateLeaderboard(path);
    setVisible(false);
  }

  return (
    <div className="Leaderboard">
      <div>
        <div className="score score-header">
          <div>Ranking</div>
          <div>Player</div>
          <div>Time</div>
        </div>
        {props.leaderboard.slice(0, 10).map((item, i) => {
          return (
            <div className="score" key={i}>
              <div># {i + 1}</div>
              <div>{item.name}</div>
              <div>{format(item.score)}</div>
            </div>
          );
        })}
      </div>
      {props.stop === 1 && visible && (
        <div className="submit-score">
          <div>Submit your score</div>
          <input
            placeholder="Name"
            onChange={handleChange}
            value={player_name}
          ></input>
          <button onClick={submitScore}>Submit</button>
        </div>
      )}
      {props.stop === 0 && (
        <div className="score-browse">
          <div>Map:</div>
          {props.collection.map((item, i) => {
            return (
              <button
                className="map"
                id={i}
                key={i}
                onClick={() => {
                  document
                    .querySelector(".selected")
                    .classList.remove("selected");
                  document.getElementById(i).classList.add("selected");
                  props.updateLeaderboard("Map/" + item.name + "/leaderboard");
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
