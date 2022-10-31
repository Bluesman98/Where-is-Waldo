import './App.css';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import Box from './components/Box';
import Dropdown from './components/Dropdown';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYzMaSZQuJ08CYgAV0Z90PGaaBSl0er_Q",

  authDomain: "where-s-waldo-99ef3.firebaseapp.com",

  projectId: "where-s-waldo-99ef3",

  storageBucket: "where-s-waldo-99ef3.appspot.com",

  messagingSenderId: "243877542922",

  appId: "1:243877542922:web:f352075d2e10fe90f973f3"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'characters');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

function App() {

  const [data,setData] = useState([])

  useEffect(()=>{  getCities(db).then((value) => {
    setData(value)
   });;},[])

   useEffect(()=>{  
    if(!data.length) console.log('end')
   },[data])

   function removeFromList(name) {
    setData(
      data.filter(function (item) {
        return item.name !== name;
      })
    );
  }

  function handleClick(e){
    console.log("pageX: "+ e.pageX)
    console.log("pageY: "+ e.pageY)
    if(e.target.tagName !== 'BUTTON'){
    setVisible(true)
    setY(e.pageY)
    setX(e.pageX)
  }
  }

  function targetValidation (targetX,targetY){
    let box = document.querySelector('.Box')
    if(box){
      return Math.abs(x-targetX) <= box.clientWidth/1.5 && Math.abs(y-targetY) <= box.clientWidth/1.5
    }

  }

  const [x,setX] = useState(0)
  const [y,setY] = useState(0)
  const [visible,setVisible] = useState(false)

  function close(){
    setVisible(false)
  }

  return (
    <div className="App" onClick={handleClick}>

      <img  src="https://cdna.artstation.com/p/assets/images/images/043/516/034/large/egor-klyuchnyk-color11.jpg?1637835295"></img>
        {visible && <Box x = {x} y = {y} ></Box>}
        {visible && <Dropdown x = {x} y = {y} close={close} data={data} targetValidation={targetValidation} removeFromList = {removeFromList}></Dropdown>}
     
    </div>
  );
}

export default App;
