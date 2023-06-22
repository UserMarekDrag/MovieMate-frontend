import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MovieItem from './MovieItem';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await axios('http://localhost:8000/api-movie/cinema_in_city');
      setMovies(result.data);
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map(movie => <MovieItem key={movie.id} movie={movie} />)}
    </div>
  );
}

export default MovieList;
