import React from 'react';
import './MovieItem.css';

const MovieItem = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.movie.image_url} alt={movie.movie.title} className="movie-poster" />
      <div className="movie-info">
        <h2 className="movie-title">{movie.movie.title}</h2>
        <p className="movie-description">{movie.movie.description}</p>
        <div className="movie-details">
          <span>{movie.cinema.name}</span>
          <span>{movie.time}</span>
        </div>
        <a href={movie.booking_link} target="_blank" rel="noopener noreferrer" className="movie-link">More info</a>
      </div>
    </div>
  );
};

export default MovieItem;
