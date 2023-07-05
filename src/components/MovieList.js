import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import MovieItem from './MovieItem';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      const searchParams = new URLSearchParams(location.search);
      const city = searchParams.get('city');
      const date = searchParams.get('date');

      const result = await axios(`http://127.0.0.1:8000/api-movie/cinemas_in_city/?cinema__city=${city}&date=${date}`);
      setMovies(result.data);
    };

    fetchMovies();
  }, [location]);

  return (
    <div className="movie-list">
      {movies.map(movie => <MovieItem key={movie.booking_link} movie={movie} />)}
    </div>
  );
}

export default MovieList;
