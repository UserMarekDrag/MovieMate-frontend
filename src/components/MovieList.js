import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';

import MovieItem from './MovieItem';
import './MovieList.css';

function MovieList() {
  const [groupedMovies, setGroupedMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      const searchParams = new URLSearchParams(location.search);
      const city = searchParams.get('city');
      const date = searchParams.get('date');

      const result = await axios(`http://127.0.0.1:8000/api-movie/cinemas_in_city/?cinema__city=${city}&date=${date}`);
      const sortedMovies = _.orderBy(result.data, ['cinema.name', 'movie.title'], ['asc', 'asc']);
      const groupedByCinema = _.groupBy(sortedMovies, 'cinema.name');

      // For each cinema, group movies with the same title
      const groupedByCinemaAndMovie = _.mapValues(groupedByCinema, moviesInCinema => {
        return _.groupBy(moviesInCinema, 'movie.title');
      });

      setGroupedMovies(groupedByCinemaAndMovie);
    };

    fetchMovies();
  }, [location]);

  return (
    <div className="movie-list">
      {Object.keys(groupedMovies).map(cinemaName => (
        <div className="cinema-section" key={cinemaName}>
          <h2 className="cinema-name">{cinemaName}</h2>
          {Object.keys(groupedMovies[cinemaName]).map(movieTitle => (
            <MovieItem key={movieTitle} movieSessions={groupedMovies[cinemaName][movieTitle]} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MovieList;
