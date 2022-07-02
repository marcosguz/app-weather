import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weather = () => {

    const [ data, setData ] = useState({})

    const [ celcius, setCelcius ] = useState(0)
    const [ isCelcius, setIsCelius ] = useState(true)

    const [ tempMaxCelcius, setTempMaxCelcius ] = useState(0)
    const [ tempMinCelcius, setTempMinCelcius ] = useState(0)

    useEffect( () => {

        const success = position => {

            const lat = position.coords.latitude
            const lon = position.coords.longitude

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aa228e08e9ed7ba7d7a931a70896b533`)
                .then(response => {
                    setData(response.data)
                    const celcius = (response.data.main.temp - 273.15)
                    const tempMaxCelcius = (response.data.main.temp_max - 273.15)
                    const tempMinCelcius = (response.data.main.temp_min - 273.15)
                    setCelcius(celcius)
                    setTempMaxCelcius(tempMaxCelcius)
                    setTempMinCelcius(tempMinCelcius)
                })
        }

        navigator.geolocation.getCurrentPosition(success);
    }, [])

    console.log(data)
    console.log(celcius)

    const changeDeg = () => {
        if (isCelcius) {
            setCelcius(((celcius * (9/5)) + 32))
            setTempMaxCelcius(((celcius * (9/5)) + 32))
            setTempMinCelcius(((celcius * (9/5)) + 32))
            setIsCelius(false)
        } else {
            setCelcius((celcius -32) * (5/9))
            setTempMaxCelcius((celcius -32) * (5/9))
            setTempMinCelcius((celcius -32) * (5/9))
            setIsCelius(true)
        }
    }

    return (
        <div className='card__weather'>
            <h1>Weather App</h1>
            <h3>{data.name}{'.'} {data.sys?.country}</h3>
            <div className='card__weather-weather'>
                <div className='card__weather-img'>
                    <div className='card__weather-temp'>
                        <p>
                            TempMax: 
                            <span> {tempMaxCelcius.toFixed(2)} {isCelcius ? '°C' : '°F'}</span>
                        </p>
                        <p>
                            TempMin: 
                            <span> {tempMinCelcius.toFixed(2)} {isCelcius ? '°C' : '°F'}</span>
                        </p>
                    </div>

                    <div className='card__weather-deg'>
                        <div className='card__weather-img-temp'>
                            <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="" />
                        </div>
                        
                        <p>{celcius.toFixed(2)} {isCelcius ? '°C' : '°F'}</p>
                    </div>

                    <div className='card__weather-humidity'>
                        <p>
                            Humidity:
                            <span> {data.main?.humidity}%</span>
                        </p>
                        <p>
                            Stade: 
                            <span> {data.weather?.[0].main}</span>
                        </p>
                    </div>
                </div>
                <div className='card__weather-info'>
                    <h4 className='card__weather-title'>"{data.weather?.[0].description}"</h4>
                    <div className='card__weather-wind'>
                        <p>
                            Wind Speed:
                            <span> {data.wind?.speed} m/s</span>
                        </p>
                    </div>

                    <div className='card__weather-clouds'>
                        <p>
                            Clouds: 
                            <span> {data.clouds?.all}%</span>
                        </p> 
                        
                    </div>

                    <div className='card__weather-pressure'>
                        <p>
                            Pressure:
                            <span> {data.main?.pressure} mb</span>
                        </p>
                    </div>
                </div>
            </div>
            

            <button onClick={changeDeg} className='card__weather-button'>Degrees °F/°C</button>
        </div>
    );
};

export default Weather;