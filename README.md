# url-shortener

This project is created using React and NestJS for shortening URLs.

## Backend

- The backend is bootstrapped using NestJS - `nest new backend --strict`
- Run postgres DB and create .env file with the config
 `docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=urlsshortenerdb -p 5432:5432 -d postgres`
