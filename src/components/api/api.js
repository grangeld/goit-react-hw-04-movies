import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// axios.defaults.headers.common['api_key'] = 'f9bd48f5e3b13d2262b70dc60f892c4d';

const trendingMovies = () => {
  return axios
    .get(`/trending/movie/day?api_key=f9bd48f5e3b13d2262b70dc60f892c4d`)
    .then(results => results.data.results)

    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const getInfoMovieById = id => {
  return (
    axios
      .get(`/movie/${id}?api_key=f9bd48f5e3b13d2262b70dc60f892c4d`)
      .then(results => results.data)
      //results.data.results
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  );
};

const getActorsListById = id => {
  return (
    axios
      .get(`/movie/${id}/credits?api_key=f9bd48f5e3b13d2262b70dc60f892c4d`)
      .then(results => results.data.cast)
      //results.data.results
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  );
};

const getReviewsTextById = id => {
  return (
    axios
      .get(`/movie/${id}/reviews?api_key=f9bd48f5e3b13d2262b70dc60f892c4d`)
      .then(results => results.data.results)
      //results.data.results
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  );
};

const searchMovieByName = name => {
  return (
    axios
      .get(
        `/search/movie?api_key=f9bd48f5e3b13d2262b70dc60f892c4d&query=${name}`,
      )
      .then(response => response.data.results)
      //results.data.results
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  );
};

export {
  trendingMovies,
  getInfoMovieById,
  getActorsListById,
  getReviewsTextById,
  searchMovieByName,
};
