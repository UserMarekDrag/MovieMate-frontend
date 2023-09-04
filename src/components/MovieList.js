import React from 'react';
import { SiGooglemaps } from 'react-icons/si';

import Loader from './Loader';
import MovieItem from './MovieItem';
import './MovieList.css';

function MovieList({ groupedMovies, isLoading }) {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="movie-list">
      {Object.entries(groupedMovies).map(([cinemaPk, cinemaMovies]) => {
        const cinemaInfo = Object.values(cinemaMovies)[0][0].cinema;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${cinemaInfo.name}, ${cinemaInfo.address}, ${cinemaInfo.city}`)}`;
        return (
          <div className="cinema-section" key={cinemaPk}>
            <div className="cinema-info">
              <h2 className="cinema-name">{cinemaInfo.name}</h2>
              <div className="container-address">
                <p className="cinema-address">{cinemaInfo.address}</p>
                <a className="map-icon" href={googleMapsUrl} target="_blank" rel="noreferrer">
                  <SiGooglemaps size={40}/>
                </a>
              </div>
            </div>
            {Object.entries(cinemaMovies).map(([movieTitle, movieSessions]) => (
              <MovieItem movieSessions={movieSessions} key={movieTitle} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default MovieList;
