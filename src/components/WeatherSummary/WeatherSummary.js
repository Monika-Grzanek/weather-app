import styles from './WeatherSummary.module.scss';

const WeatherSummary = props => {
  return (
    <section className={styles.weatherSummary}>
      <img
        className={styles.weatherIcon}
        alt={props.value.description}
        src={`${process.env.PUBLIC_URL}/images/weather-icons/${props.value.icon}.png`} />
      <div className={styles.weatherInfo}>
        <h2>{props.value.city}</h2>
        <p>
          <strong>Temp:</strong> {props.value.temp}
        </p>
      </div>
    </section>
  );
};

export default WeatherSummary;