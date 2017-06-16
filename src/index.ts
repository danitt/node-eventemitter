import { getTemperature, getHumidity, getPressure } from './mocks'
const EventEmitter = require('events')

interface weatherMeasurements {
  temperature: number,
  humidity: number,
  pressure: number
}

function measurementsChanged() {
  // call WeatherData
}

class WeatherData extends EventEmitter {
  // set a timer to randomly emit a weather event
  // setInterval -> measurementsChanged()
}

function currentConditionsDisplay(data: weatherMeasurements) {}
function statisticsDisplay(data: weatherMeasurements) {}
function forecastDisplay(data: weatherMeasurements) {}


console.log('Hello .. world?')
