require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

// Setting up environment variable
const PORT = 3000;
const HOST = 'localhost';

// isko bdlo fir login kro
const dbConnectionString =
  'mongodb+srv://Machiorpolly:Machiorpolly@cluster0.fhs0oed.mongodb.net/';

mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// Running the server
app.listen(PORT, HOST, (err) => {
  if (err) {
    console.error('Problem starting the server!');
    throw err;
  }
  console.log(`Server running on http://${HOST}:${PORT}`);
});
