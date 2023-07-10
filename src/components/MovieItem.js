import React, { useState } from 'react';
import './MovieItem.css';

function MovieItem({ movieSessions }) {
  const [showTimesVisible, setShowTimesVisible] = useState(false);
  const firstMovieSession = movieSessions[0];

  const handleShowtimesToggle = () => {
    setShowTimesVisible(!showTimesVisible);
  };

  return (
    <div className="movie-card">
      <a className="movie-link-individual" href={firstMovieSession.movie.movie_url}>
        <img className="movie-poster" src={firstMovieSession.movie.image_url} alt={`${firstMovieSession.movie.title} poster`} />
      </a>
      <div className="movie-info">
        <h3><a className="movie-link-individual" href={firstMovieSession.movie.movie_url}>{firstMovieSession.movie.title}</a></h3>
        <button className="showtimes-toggle" onClick={handleShowtimesToggle}>
          Showtimes
        </button>
        <div className={`showtimes-container ${showTimesVisible ? 'visible' : ''}`}>
          {movieSessions.map((session, index) => (
            <a className="movie-link" href={session.booking_link} key={index}>{session.time}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieItem;
