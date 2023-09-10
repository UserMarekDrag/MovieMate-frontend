import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

import './SearchForm.css';
import MovieList from './MovieList';

const cities = ['belchatow', 'biala-podlaska', 'bialystok', 'bielsko-biala', 'bydgoszcz', 
'czechowice-dziedzice', 'dabrowa-gornicza', 'elblag', 'gdansk', 'gdynia', 'glogow', 'gniezno', 
'gorzow-wielkopolski', 'grudziadz', 'jaworzno', 'jelenia-gora', 'kalisz', 'katowice', 'kedzierzyn-kozle', 
'kielce', 'klodzko', 'konin', 'koszalin', 'krakow', 'krosno', 'legionowo', 'legnica', 'leszno', 'lodz', 
'lomza', 'lubin', 'lublin', 'mielec', 'nowy-sacz', 'olsztyn', 'opole', 'ostrow-wielkopolski', 'pabianice', 
'pila', 'piotrkow-trybunalski', 'plock', 'poznan', 'pruszkow', 'przemysl', 'radom', 'rumia', 'rybnik', 
'rzeszow', 'siedlce', 'slupsk', 'sopot', 'sosnowiec', 'stalowa-wola', 'starachowice', 'swidnica', 'swinoujscie', 
'szczecin', 'tarnow', 'tczew', 'tomaszow-mazowiecki', 'tychy', 'warszawa', 'wloclawek', 'wolomin', 
'wroclaw', 'zabrze', 'zgorzelec', 'zory'];

function SearchForm() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [groupedMovies, setGroupedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();


    if (!city || !date) {
      setError("Please fill both fields");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await axios(`${process.env.REACT_APP_API_URL}/api-movie/cinemas_in_city/?cinema__city=${city}&date=${date}`);
      if (result.data.length === 0) {
        setError("No results found");
        setIsLoading(false);
        return;
      }
      
      const sortedMovies = _.orderBy(result.data, ['cinema.name', 'movie.title'], ['desc', 'asc']);
      const groupedByCinema = _.groupBy(sortedMovies, 'cinema.pk');
      const groupedByCinemaAndMovie = _.mapValues(groupedByCinema, moviesInCinema => _.groupBy(moviesInCinema, 'movie.title'));
      
      setGroupedMovies(groupedByCinemaAndMovie);
    } catch (err) {
      setError("An error occurred");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="description-container">
          <h3>
            Search for movie screenings in your city!
          </h3>
          <p>
            Select city name and date to see a list of movies showing in cinemas near you.
          </p>
        </div>
        <div className="input-container">
          <select value={city} onChange={e => setCity(e.target.value)}>
            <option value="">Select city</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>
            ))}
          </select>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <button type="submit">Search</button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
      <MovieList groupedMovies={groupedMovies} isLoading={isLoading} />
    </div>
  );
}

export default SearchForm;
