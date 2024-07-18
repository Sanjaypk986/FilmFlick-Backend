const Upcoming = require("../models/upcomingModel");


// get all movies
const upcomingMovies = async (req, res) => {
  try {
    const movies = await Upcoming.find(req.query);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Internal Server Error");
  }
};

// get movie by id
const upcomingMovieById = async (req, res) => {
  try {
    const movie = await Upcoming.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// add movie
const addUpcomingMovie = async (req, res) => {
  try {
    const movie = new Upcoming(req.body);
    await movie.save();
    res.json(movie);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Failed to add movie' });
  }
};

//   update movie
const updateUpcomingMovie = async (req, res) => {
  try {
    const updatedMovie = await Upcoming.findByIdAndUpdate(
      req.params.movieId,
      req.body,
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).send('Movie not found');
    }
    res.send(updatedMovie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).send('Internal Server Error');
  }
};


//   delete movie
const deleteUpcomingMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const deletedMovie = await Upcoming.findByIdAndDelete(movieId);

    res.status(200).send({ message: 'Movie deleted successfully', movie: deletedMovie });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting movie', error: error.message });
  }
};

module.exports = {
 upcomingMovieById,upcomingMovies,addUpcomingMovie,updateUpcomingMovie,deleteUpcomingMovie
};
