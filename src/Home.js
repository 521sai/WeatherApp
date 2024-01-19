/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name :'London',
        humidity: 10,
        speed: 2,
        image: '/images/cloudy.png'
    })
    const [name, setName] = useState('');
    const handleClick = () =>{
        if(name !== ""){
            const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=e89e48e6721e82cee095013a0831e068&&units=metric`   
            axios.get(apiUrl)
            .then(res => {
                let imagePath = '';
                if(res.data.weather[0].main === 'Clouds'){
                    imagePath ='/images/cloudy.png'
                }else if(res.data.weather[0].main === "Clear"){
                    imagePath ="/images/windy.png"
                }else if(res.data.weather[0].main === "Mist"){
                    imagePath ="/images/mist.png"
                }else if(res.data.weather[0].main === "Rain"){
                    imagePath ="/images/rain.png"
                }else if(res.data.weather[0].main === "Drizzle"){
                    imagePath ="/images/drizzle.png"
                }else if(res.data.weather[0].main === "Haze"){
                    imagePath ="/images/haze.png"
                }
                else{
                    imagePath = "/images/cloudy.png"
                }
                console.log(res.data)
                setData({...data, celcius:res.data.main.temp, name: res.data.name, 
                    humidity:res.data.main.humidity, speed:res.data.wind.speed, image:imagePath })
            })
            .catch( err => console.log(err));
        }
    }
       
  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type="text" placeholder='Enter city name' onChange={e => setName(e.target.value)}/>
                <button><img src="/images/search2.png" alt="" onClick={handleClick}/></button>
            </div>
            <div className='winfo'>
                <img src={data.image} className='icon' alt=''/>
                <h1>{Math.round(data.celcius)}°c</h1>
                <h2>{data.name}</h2>
                <div className='details'>
                    <div className='col'>
                        <img src="/images/humidity.png" alt=""/>
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='col'>
                        <img src="/images/windy.png" alt=""/>
                        <div className='wind'>
                            <p>{Math.round(data.speed)}km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>                   
                </div>
            </div>
        </div>
    </div>
  )
}
export default Home