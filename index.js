require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const movieRoutes = require('./routes/movieRoutes')
const genreRoutes = require('./routes/genreRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const upcomingRoutes = require('./routes/upcomingRoutes')
const premiereRoutes = require('./routes/premiereRoutes')
const port = 3001;

// CORS
app.use(cors({
  credentials : true,
  origin : true
}))
// Read cookies.
app.use(cookieParser())
// Req.body
app.use(express.json())

app.use('/movies', movieRoutes )
app.use('/genres', genreRoutes )
app.use('/users',  userRoutes)
app.use('/auth',  authRoutes)
app.use('/reviews',  reviewRoutes)
app.use('/upcoming',  upcomingRoutes)
app.use('/premiere',  premiereRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


main().then(()=> console.log("Connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION);

}