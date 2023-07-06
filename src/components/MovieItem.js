import React from 'react';

import './MovieItem.css';

function MovieItem({ movieSessions }) {
  const firstMovieSession = movieSessions[0];

  return (
    <div className="movie-card">
      <img className="movie-poster" src={firstMovieSession.movie.image_url} alt={`${firstMovieSession.movie.title} poster`} />
      <div className="movie-info">
        <h3>{firstMovieSession.movie.title}</h3>
        {movieSessions.map((session, index) => (
          <a className="movie-link" href={session.booking_link} key={index}>Showtime: {session.time}</a>
        ))}
      </div>
    </div>
  );
}

export default MovieItem;
