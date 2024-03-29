import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

import './SearchForm.css';
import MovieList from './MovieList';

const cities = ['bialystok', 'gdansk', 'gorzow-wielkopolski', 'kalisz', 'katowice', 'kielce', 'koszalin', 
'krakow', 'lodz', 'olsztyn', 'opole','poznan', 'radom', 'rzeszow', 'szczecin', 'tychy', 'warszawa', 'wroclaw'
];

const today = new Date().toISOString().split('T')[0];

function SearchForm() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState(today);
  const [groupedMovies, setGroupedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();


    if (!city || !date) {
      setError("Both city and date fields are required for search.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await axios(`${process.env.REACT_APP_API_URL}/api-movie/cinemas_in_city/?cinema__city=${city}&date=${date}`);
      if (result.data.length === 0) {
        setError("No screenings found for the given city and date.");
        setIsLoading(false);
        return;
      }
      
      const sortedMovies = _.orderBy(result.data, ['cinema.name', 'movie.title'], ['desc', 'asc']);
      const groupedByCinema = _.groupBy(sortedMovies, 'cinema.pk');
      const groupedByCinemaAndMovie = _.mapValues(groupedByCinema, moviesInCinema => _.groupBy(moviesInCinema, 'movie.title'));
      
      setGroupedMovies(groupedByCinemaAndMovie);
    } catch (err) {
      setError("Oops! An unexpected error occurred. Please try again later.");
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
