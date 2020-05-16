import app from './app';

// Add .env variables to the application
require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port);
