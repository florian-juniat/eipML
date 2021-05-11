import React, {useState} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';


import vert from "./assets/vert.png"
import rouge from "./assets/rouge.png"

import "./style.css"

const App = () => {

  const [info, setInfo] = useState({"ml": "no", "nb": 0.0, "sizedb": 0.0, "pourcentage": 0.0, "state": "no"})
  const [test, setTest] = useState(true)
  const [error, setError] = useState("")
 

  if (test == true) {
    setTest(false)
    axios.post('https://eipmachinelearning.herokuapp.com/', {
        user: "admin",
        password: "ragondin"
    }).then(res => {
        setInfo(res.data)
    }).catch(function (error) {
      console.log(error)
      setError("there is an error")
    });
  }

  const refresh = () => {
    axios.post('https://eipmachinelearning.herokuapp.com/', {
        user: "admin",
        password: "ragondin"
    }).then(res => {
        setInfo(res.data)
    }).catch(function (error) {
      console.log(error)
      setError("there is an error")
    });
  }

  return (
    <div>
      <p> Sizedb: {info.sizedb} </p>
      <p> Type Machine Learning: {info.ml} </p>
      <p> Number: {info.nb} / 7 </p>
      <p> Pourcentage avancement: {info.pourcentage} % </p>
      <img className="photo" src={info.state == "ok" ? vert : rouge} alt="Logo" />
      <p style={{color: "red"}}>{error}</p>
      <Button onclick="refresh()" variant="primary">
        Refresh
      </Button>
    </div>
  );
};

export default App;
