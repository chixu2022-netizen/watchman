Frontend configuration

This project uses an environment-based API base URL in the frontend. Create a `.env` in the frontend root with:

REACT_APP_API_URL=http://localhost:5000

Then start the frontend as usual with `npm start`.

In production, set REACT_APP_API_URL to your deployed backend URL and set ALLOWED_ORIGIN in the backend to restrict CORS.
