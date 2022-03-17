import React,{useEffect, useState} from 'react'
import Weathercard from './weathercard';
import './style.css'

const Temp = () => {
  const[searchValue, setSearchValue]= useState("Israel");
  const[tempInfo, setTempInfo] = useState({});
  const[background, setBackground] = useState("");

  const getWeatherInfo = async()=>{
    try{
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3abfd80a8921235bda4cb3260226bf6d`;
    let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
     
      if(weathermood){
        switch(weathermood){
          case "Clouds":
          setBackground("clouds.jpg");
          break;
          case "Haze":
            setBackground("clouds.jpg");
           break;
           case "Clear":
            setBackground("clear.jpg");
           break;
           case "Mist":
            setBackground("sunny.jpg");
           break;
           case "Rain":
            setBackground("rain.jpg");
           break;
           case "Thunderstorm":
            setBackground("thunderstorm.jpg");
           break;
           case "Snow":
            setBackground("snow.jpg");
           break;
           default:
            setBackground("sunny.jpg");
             break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);


  
    return (
    <>
    <div className="wrap" style={{
      backgroundImage: `url("./images/${background}")` ,
      backgroundRepeat:"no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    }}>

    <div className="main-title">
     <h2>AccuWeather</h2>
    </div>

      <div className="search">
         <input type="search" placeholder="Enter the place" title="Enter the place.."
         autoFocus id="search" className="searchItem" value={searchValue} 
         onChange={(e)=>setSearchValue(e.target.value)} />

         <button className="searchButton" type="button" onClick={getWeatherInfo}>
           Search
         </button>
      </div>
   
    <Weathercard tempInfo={tempInfo}/>
    </div>

    </>
  )
}

export default Temp


//api.openweathermap.org/data/2.5/weather?q=delhi&appid=3abfd80a8921235bda4cb3260226bf6d

//3abfd80a8921235bda4cb3260226bf6d -API Key