import axios from "axios";
import './App.css';
import React,{Fragment, useState, useEffect} from "react";




function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false)
  

  let getWeather = async (lat, long) =>{
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather",{
      params:{
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data)
    console.log(weather.description)
    
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      getWeather(position.coords.latitude, position.coords.longitude);
    setLocation(true)
    })
  }, [])

  if(location == false){
    return(
      <Fragment>
        <p>Você precisa habilitar sua localização no browser</p>
      </Fragment>
    )

  } else if(weather == false){
    return(
      <Fragment>
        <div className="loading">
        Carregando o clima...
        </div>
      </Fragment>
    )
      
  } else{
    return (
      <Fragment>
        <div className="App">
          <div className="app-header">
          <h1 >Clima na sua Região({weather['weather'][0]['description']})</h1>
            <hr/>
          </div>
          <div className="container-img">
            
            <p className="tempNow"> {weather['main'] ['temp']}ºC <img/></p>
          </div>
            <ul>
              <li>Temperatura máxima: {weather['main'] ['temp_max']} ºC</li>
              <li>Temperatura mínima: {weather['main'] ['temp_min']} ºC</li>
              <li>Pressão: {weather['main'] ['pressure']} hpa</li>
              <li>Umidade: {weather['main'] ['humidity']} %</li>
            </ul>
          </div>
      </Fragment>
    );
  }
}

export default App;
