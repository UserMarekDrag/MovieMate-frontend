import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

import './SearchForm.css';
import MovieList from './MovieList';

function SearchForm() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [groupedMovies, setGroupedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);
    try {
      const result = await axios(`http://127.0.0.1:8000/api-movie/cinemas_in_city/?cinema__city=${city}&date=${date}`);
      if (result.data.length === 0) {
        setError("No results found");
        setIsLoading(false);
        return;
      }
      
      const sortedMovies = _.orderBy(result.data, ['cinema.name', 'movie.title'], ['desc', 'asc']);
      const groupedByCinema = _.groupBy(sortedMovies, 'cinema.name');
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
            Enter city name and select a date to see a list of movies showing in cinemas near you.
          </p>
        </div>
        <div className="input-container">
          <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city" />
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
