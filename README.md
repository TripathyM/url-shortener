# URL Shortener

This project is a URL shortening service built with React and NestJS.
You can access it here https://bituly.onrender.com

## Project Structure

The project follows a monorepo setup and is divided into two main parts: the frontend and the backend.

## How it Works

The URL shortener works in the following way:

1. The user enters a long URL to be shortened in the frontend.
2. The backend receives this long URL and generates a unique 5-character slug. To ensure the unique generation of the slug, the sequential DB identifier for the record is encoded in base62 format, allowing 62 characters for the slug - numbers and upper/lowercase letters.
3. The original URL and its corresponding slug are stored in the PostgreSQL database. A shortened URL with the slug is returned to the frontend.
4. When an end-user navigates to the shortened URL, the backend decodes the slug to its original DB identifier and then retrieves the original URL from the DB by querying with this decoded ID.
5. The backend then redirects the user to the original URL.

This model ensures that the URL shortening process is quick and efficient, and that users are redirected to the original URL as quickly as possible. However, the downside is that the shortened URL slugs follow a uniform structure like 'bkkka' or 'bkkk8', since the DB identifiers are sequential.

### Backend

The backend is located in the `backend/` directory. It is built with NestJS and uses a PostgreSQL database.

To set up the backend:

1. Run a PostgreSQL database and create a `.env` file with the configuration inside the backend dir. You can use Docker for this:

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=urlsshortenerdb -p 5432:5432 -d postgres
```

2. Run the following command from within the backend directory:

```bash
npm install && npm run start
```

This will run the backend by default on 3000 port

### Frontend

The frontend is located in the `frontend/` directory. It is built with React and bootstrapped using Vite.

To set up the frontend:

1. The .env file is already shipped with the frontend with the default backend URL. In case you have set up the backend in a different port, modify the .env file accordingly.
2. Run the following command from within the frontend directory

```bash
npm install && npm run dev
```

## Running the project

To run the project, you need to start both the frontend and the backend. Instructions for starting each part can be found in the above sections.

## Deployment

The backend, frontend, and database are hosted on [Render](https://render.com/), utilizing its free tier. Due to this, instances may spin down during periods of inactivity. You can access the website [here](https://bituly.onrender.com). Please note that it might take some time for the service to wake up from inactivity - a perfect opportunity to grab a cup of tea!

## Tests

- Jest and React Testing library is used to write the unit tests in this project.
- Property based testing using [Fast-check](https://fast-check.dev/) is implemented for Encoding and decoding. This ensures high confidence on the logic since it is tested using various random combinations
