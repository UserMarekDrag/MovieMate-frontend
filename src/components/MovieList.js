import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import { SiGooglemaps } from 'react-icons/si';

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
      {Object.entries(groupedMovies).map(([cinemaName, cinemaMovies]) => {
        const cinemaInfo = Object.values(cinemaMovies)[0][0].cinema;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${cinemaName}, ${cinemaInfo.address}, ${cinemaInfo.city}`)}`;
        return (
          <div className="cinema-section" key={cinemaName}>
            <div className="cinema-info">
              <h2 className="cinema-name">{cinemaName}</h2>
              <div className="container-address">
                <p className="cinema-address">{cinemaInfo.city}</p>
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
