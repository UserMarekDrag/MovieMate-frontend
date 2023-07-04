# MovieMate Frontend

Welcome to MovieMate, the ultimate movie showtimes hub for cinema lovers in Poland. This frontend repository contains the user interface code written primarily in React.

## About

MovieMate offers a seamless user experience where users can select their city and date to view all available movie showtimes from major cinema chains in Poland, including Multikino and Helios. The frontend interacts with the backend service, which scrapes data daily from cinema websites to keep the information up-to-date and comprehensive.

## Features

- **Movie Showtimes**: Users can choose their city and date to view all movie showtimes from all cinemas in that city. The application offers detailed information about each showtime and includes links for additional details.

- **Reservations**: The application provides direct links for movie reservations, offering an effortless booking experience for the users.

## Prerequisites

Before running the frontend, ensure you have the following installed:
- Docker 
- docker-compose

## Installation

To get the frontend running on your local machine:
1. Clone this repository.
2. Navigate to the root directory of the repository.
3. Build the Docker image and start the containers using `docker-compose up --build`.
4. The frontend should now be accessible at http://localhost:3000/.

## Docker

We use Docker to simplify the development and deployment processes. All the necessary configurations are provided in the Dockerfile and docker-compose.yml file in the repository.

## API Endpoints

This frontend service relies on the backend API to retrieve data. The main API endpoints are for fetching movie showtimes and user management. For detailed information about these endpoints, including request and response formats, refer to the backend API documentation.

## Deployment

To deploy the frontend in a production environment, follow these steps:
1. Ensure Docker is installed on the target system.
2. Clone this repository and navigate to the root directory.
3. Build the Docker image and start the containers using `docker-compose up --build -d`.
4. The frontend should now be accessible at the configured host and port.

## License

The MovieMate project is open-source, released under the MIT License. You are free to use, modify, and distribute the code as per the terms of the license.

## Contact

For any queries or issues regarding the MovieMate project, feel free to contact the project maintainers or raise an issue in this repository.

Enjoy your movie showtimes with MovieMate! 🎥🍿🎞️

## Author
Marek Drąg