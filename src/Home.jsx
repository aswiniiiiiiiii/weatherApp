import React, { useState } from 'react'
import humdity from './assets/flood.png'
import wind from './assets/windd.png'
import Land from './assets/land4.jpeg'
import sun from './assets/cloudy.png'
import './Home.css'
import { Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios'

const Home = () => {
  const [inputData, setInputData] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  
  const apiKey = "8ac5c4d57ba6a4b3dfcf622700447b1e"

  const getweatherData = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputData}&appid=${apiKey}`
    try {
      if (!inputData) {
      alert("Please enter a location!")
      return;
    }
      const response = await axios.get(apiUrl);
      const result = response.data;
      setWeatherData(result);
    } catch (err) {
      console.log(err);
      alert("Invalid Input! Please enter a valid location.");
    }
  }

  return (
    <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center bg-dark '>
      <div className='weather '>
        <h2 className='fw-bolder px-5 pt-5 pb-2'>WEATHER DETAILS</h2>
        <Form inline className='d-flex justify-content-center align-items-center' onSubmit={getweatherData}>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Enter a location"
                className="mr-sm-2"
                value={inputData}
                onChange={e => setInputData(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" className='btn-warning fw-bolder'>Submit</Button>
            </Col>
          </Row>
        </Form>

        {weatherData && (
          <div>
            <div className="d-flex flex-column justify-content-center align-items-center mt-4" >
              <img style={{ width: "8rem" }} src={sun} alt="Weather Icon" />
              <h2 className='pt-3'>{weatherData.name}</h2>
              <h1 className='degree'>{weatherData.main.temp}°C</h1>          
            </div>
            
            <div className="d-flex justify-content-center align-items-center gap-5 py-5">
              <div className='d-flex justify-content-center gap-3'>
                <img className='humidity' src={humdity} alt="Humidity Icon" />
                <div className='d-flex flex-column'>
                  <h4>{weatherData.main.humidity} %</h4>
                  <h6>Humidity</h6>
                </div>
              </div>
              <div className="d-flex justify-content-center gap-3">
                <img className='wind' src={wind} alt="Wind Speed Icon" />
                <div className="d-flex flex-column">
                  <h4>{weatherData.wind.speed} km/h</h4> 
                  <h6>Wind Speed</h6>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <img className='w-100' src={Land} alt="" />
    </div>
  )
}

export default Home;
