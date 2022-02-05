import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';


const WeatherBox = () => {
  
  const handleCityChange = useCallback(value => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=5d9df579968077defb121d007ddd656a&units=metric`)
      .then(res => res.json())
      .then(data => {
        console.log(`city:${value}`, data);
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };
      });
  }, []);

  const [weatherData, setWeatherData] = useState('');

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary value={weatherData} onChange={e => setWeatherData(e.target.value)}/>
      <Loader />
    </section>
  )
};

export default WeatherBox;