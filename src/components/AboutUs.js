import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <p>
        Welcome to MovieMate, your one-stop solution for movie enthusiasts in Poland! Our application offers an interface where users can select their city and date to view all available movie showtimes, along with reservation links. By daily scraping data from the websites of two of the largest cinemas in Poland, Multikino and Helios, we keep our information up-to-date and comprehensive. We plan to add more cinemas over time as we continue to expand our site's functionality.
      </p>
      <p>
        Our application doesn't just offer movie showtimes. With data scraping capabilities, we gather information about showtimes for all cities, cinemas, and corresponding dates every day. Moreover, MovieMate is ever-evolving, and we continually add new features.
      </p>
      <p>
        We're glad you're here! We invite you to discover available showtimes and manage your reservations. With MovieMate, you gain access to the world of movies at your fingertips. Happy watching! 🎥🍿🎞️
      </p>
    </div>
  );
}

export default AboutUs;
