const Movie = require ("../models/movieModels");

// get all movies
const getAllMovies = async (req, res) => {
  try {

    const { search,genre ,language } = req.query;
     // Construct the query object
     const query = {};

     // Add search filter if a search term is provided
     if (search) {
       query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
     }
 
     // Add genre filter if provided
     if (genre) {
       query.genre = genre;
     }
 
     // Add language filter if provided
     if (language) {
       query.language = language;
     }
 
    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Internal Server Error");
  }
};


// get movie by id
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
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
const addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.json(movie);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Failed to add movie' });
  }
};

//   update movie
const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
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
const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    res.status(200).send({ message: 'Movie deleted successfully', movie: deletedMovie });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting movie', error: error.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
