import "./styles/App.css";
import React from "react";
import Modal from "react-modal";
import Stopwatch from "./components/Stopwatch";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { collection as col } from "firebase/firestore";
import Box from "./components/Box";
import Dropdown from "./components/Dropdown";
import MapSelection from "./components/MapSelection";
import Characters from "./components/Characters";
import Leaderboard from "./components/Leaderboard";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYzMaSZQuJ08CYgAV0Z90PGaaBSl0er_Q",

  authDomain: "where-s-waldo-99ef3.firebaseapp.com",

  projectId: "where-s-waldo-99ef3",

  storageBucket: "where-s-waldo-99ef3.appspot.com",

  messagingSenderId: "243877542922",

  appId: "1:243877542922:web:f352075d2e10fe90f973f3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getData(db, string) {
  const dataCol = col(db, string);
  const dataSnapshot = await getDocs(dataCol);
  const dataList = dataSnapshot.docs.map((doc) => doc.data());
  return dataList;
}

Modal.setAppElement("#root");

function App() {
  const [data, setData] = useState([0]);
  const [collection, setCollection] = useState([0]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [stop, setStop] = useState(0);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(0);
  const [img, setImg] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [visible, setVisible] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [currentMap, setCurrentMap] = useState("");

  useEffect(() => {
    getData(db, "Map").then((value) => {
      setCollection(value);
    });
    getData(db, "Map/01/leaderboard").then((value) => {
      setLeaderboard(
        value.sort((a, b) => {
          return a.score - b.score;
        })
      );
    });
  }, []);

  useEffect(() => {
    if (!data.length) {
      setStop(1);
      setTimeout(() => {
        openModal();
      }, 100);
    }
  }, [data]);

  function updateLeaderboard(string) {
    getData(db, string).then((value) => {
      setLeaderboard(
        value.sort((a, b) => {
          return a.score - b.score;
        })
      );
    });
  }

  function removeFromList(name) {
    setData(
      data.filter(function (item) {
        return item.name !== name;
      })
    );
  }

  function handleClick(e) {
    setVisible(true);
    setY(e.pageY);
    setX(e.pageX);
  }

  function targetValidation(targetX, targetY) {
    let box = document.querySelector(".Box");
    if (box) {
      return (
        Math.abs(x - targetX) <= box.clientWidth / 1.5 &&
        Math.abs(y - targetY) <= box.clientWidth / 1.5
      );
    }
  }

  function close() {
    setVisible(false);
  }

  function submitScore(name, value, path) {
    setDoc(doc(db, path, name), {
      name: name,
      score: value,
    });
  }

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    if (document.querySelector(".map"))
      document.querySelector(".map").classList.add("selected");
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="App">
      {visible && <Box x={x} y={y}></Box>}
      {visible && (
        <Dropdown
          x={x}
          y={y}
          close={close}
          data={data}
          targetValidation={targetValidation}
          removeFromList={removeFromList}
        ></Dropdown>
      )}
      {!gameStart && (
        <div className="home-header">
          <div>Find the Characters</div>
          <div>
            <button
              onClick={() => {
                openModal();
              }}
            >
              Leaderboard
            </button>
            <div>
              <div>Images by</div>
              <a href="https://www.artstation.com/chekavo">Egor Klyuchnyk</a>
            </div>
          </div>
        </div>
      )}
      {gameStart && (
        <div className="header">
          <button
            onClick={() => {
              window.location.reload(false);
            }}
          >
            Home
          </button>
          <Stopwatch
            stop={stop}
            start={start}
            setStart={setStart}
            setTime={setTime}
          ></Stopwatch>
          <Characters data={data}></Characters>
        </div>
      )}
      {!gameStart && (
        <MapSelection
          db={db}
          getData={getData}
          collection={collection}
          setData={setData}
          setImg={setImg}
          setStart={setStart}
          setGameStart={setGameStart}
          updateLeaderboard={updateLeaderboard}
          setCurrentMap={setCurrentMap}
        ></MapSelection>
      )}
      {gameStart && (
        <div>
          <img
            onClick={(e) => {
              handleClick(e);
            }}
            src={img}
          ></img>
        </div>
      )}
      <Modal
        className={"Modal"}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <Leaderboard
          currentMap={currentMap}
          leaderboard={leaderboard}
          stop={stop}
          time={time}
          submitScore={submitScore}
          updateLeaderboard={updateLeaderboard}
          collection={collection}
        ></Leaderboard>
      </Modal>
    </div>
  );
}

export default App;
