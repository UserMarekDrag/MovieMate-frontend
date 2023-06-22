import React from 'react';
import './MovieItem.css';

const MovieItem = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-description">{movie.description}</p>
      <div className="movie-details">
        <span>{movie.cinemaName}</span>
        <span>{movie.showTime}</span>
      </div>
      <a href={movie.link} target="_blank" rel="noopener noreferrer" className="movie-link">More info</a>
    </div>
  );
};

export default MovieItem;
