# Environment Variables

- `API_URL`: Set to the API URL in Heroku and `http://localhost:3000` locally.
- `ELEVENTY_ENV`: Set to `production` in Netlify and `development` locally.
- `BUILD_ENV`: Set to `production` in Heroku and `development` locally.
- `DB_STRING`: Set to a live cloud-hosted MongoDB connection string in Heroku and a local MongoDB connection string locally.
- `JWT_PRIVATE_KEY`: Set to a secure random string in Heroku and locally.
- `SITE_URL`: Set to the client website URL in Heroku and `http://localhost:8082` locally.

## User credentials

These are used by `npm run pledge:results` to login to the server API and download database results.

- `USER_EMAIL`: Set to a user email address in the production DB.
- `USER_PASSWORD`: Set to the password for the user in the production DB.
