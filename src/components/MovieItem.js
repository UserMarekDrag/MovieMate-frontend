import React, { useState } from 'react';
import './MovieItem.css';
import Loader from './Loader';

function MovieItem({ movieSessions }) {
  const [showTimesVisible, setShowTimesVisible] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const firstMovieSession = movieSessions[0];

  const handleShowtimesToggle = () => {
    setShowTimesVisible(!showTimesVisible);
  };

  return (
    <div className="movie-card">
      <a className="movie-link-individual" href={firstMovieSession.movie.movie_url} target="_blank" rel="noopener noreferrer">
        {!isImageLoaded && <Loader />}
        <img 
          className="movie-poster" 
          src={firstMovieSession.movie.image_url} 
          alt={`${firstMovieSession.movie.title} poster`} 
          onLoad={() => setImageLoaded(true)}
        />
      </a>
      <div className="movie-info">
        <h3><a className="movie-link-individual" href={firstMovieSession.movie.movie_url} target="_blank" rel="noopener noreferrer">{firstMovieSession.movie.title}</a></h3>
        <button className="showtimes-toggle" onClick={handleShowtimesToggle}>
          Showtimes
        </button>
        <div className={`showtimes-container ${showTimesVisible ? 'visible' : ''}`}>
          {movieSessions.map((session, index) => (
            <a className="movie-link" href={session.booking_link} target="_blank" rel="noopener noreferrer" key={index}>{session.time}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieItem;
