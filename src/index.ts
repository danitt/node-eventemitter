import { EventEmitter } from 'events'

interface weatherMeasurements {
  temperature: number,
  humidity: number,
  pressure: number
}

(function measurementsChanged() {
  const weatherMeasurements: weatherMeasurements = {
    temperature: getRandomInteger(100),
    humidity: getRandomInteger(100),
    pressure: getRandomInteger(100)
  }
    setTimeout(function() {
      WeatherData.emit('data', weatherMeasurements)
      measurementsChanged()
    }, getRandomInteger(2000));
}())

const WeatherData = new EventEmitter()

class Display {
  data: weatherMeasurements
  subscription: EventEmitter | false
  isSubscribed: boolean = false
  constructor(
    private weatherDataEmitter: EventEmitter,
    private name: string,
    private handler
    ) {
    console.log(`Instantiated new Display: ${name}`)
    this.weatherDataEmitter.on('data', (data) => {
      if (this.isSubscribed) this.handler(data)
    })
  }
  subscribe = () => this.isSubscribed = true
  unsubscribe = () => this.isSubscribed = false
}

console.log(`\n ### Instantiating Observers`)
const currentConditionsDisplay = new Display(WeatherData, 'currentConditionsDisplay', data => {
  console.log('currentConditionsDisplayHandler')
})
const statisticsDisplay = new Display(WeatherData, 'statisticsDisplay', data => {
  console.log('statisticsDisplayHandler')
})
const forecastDisplay = new Display(WeatherData, 'forecastDisplay', data => {
  console.log('forecastDisplayHandler')
})

console.log(`\n ### Subscribing Observers`)

currentConditionsDisplay.subscribe()
statisticsDisplay.subscribe()

setTimeout(function() {
  console.log('\n### Unsubscribing currentConditionsDisplay')
  currentConditionsDisplay.unsubscribe()
  console.log('### Subscribing forecastDisplay')
  forecastDisplay.subscribe()
  console.log('### Instantiating + Subscribing newDisplay')
  const newDisplay = new Display(WeatherData, 'newDisplay', data => console.log('newDisplayHandler'))
  newDisplay.subscribe()
}, 5000)


function getRandomInteger(max: number = 1, min: number = 0) {
  return Math.floor(Math.random() * (max - min)) + min
}
