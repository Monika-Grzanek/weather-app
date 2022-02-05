import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox.js'


const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [pending, setPending] = useState(false);
  const [mistake, setMistake] = useState(false);

  const handleCityChange = useCallback(value => {
    setPending(true);
    setMistake(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=5d9df579968077defb121d007ddd656a&units=metric`)
      .then(res => {
          if(res.status === 200) {
            return res.json()
              .then(data => {
                setPending(false);
                console.log(`city:${value}`, data);
                setWeatherData({
                  city: data.name,
                  temp: data.main.temp,
                  icon: data.weather[0].icon,
                  description: data.weather[0].main
                })
              })
          } else {
              setMistake(true);
          }
      });
  }, []);


  return (
    <section>
      <PickCity action={handleCityChange} />
      {(weatherData && !pending && !mistake) && <WeatherSummary weatherData={weatherData} /> }
      {(pending && !mistake) && <Loader />}
      {mistake && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;