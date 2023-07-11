import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';

import MovieItem from './MovieItem';
import './MovieList.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MovieList() {
  const [groupedMovies, setGroupedMovies] = useState([]);
  let query = useQuery();

  useEffect(() => {
    const fetchMovies = async () => {
      const city = query.get("city");
      const date = query.get("date");

      const result = await axios(`http://127.0.0.1:8000/api-movie/cinemas_in_city/?cinema__city=${city}&date=${date}`);
      const sortedMovies = _.orderBy(result.data, ['cinema.name', 'movie.title'], ['desc', 'asc']);
      const groupedByCinema = _.groupBy(sortedMovies, 'cinema.name');

      const groupedByCinemaAndMovie = _.mapValues(groupedByCinema, moviesInCinema => {
        return _.groupBy(moviesInCinema, 'movie.title');
      });

      setGroupedMovies(groupedByCinemaAndMovie);
    };

    if (query.get("city") && query.get("date")) {
      fetchMovies();
    }
  }, [query]);

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
