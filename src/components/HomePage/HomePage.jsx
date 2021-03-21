import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trendingMovies } from '../api/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    trendingMovies().then(respons =>
      setMovies(
        respons.map(({ title, id }) => (
          <li key={id}>
            <Link to={{ pathname: `/movies/${id}`, state: { page: '/' } }}>
              {title}
            </Link>
          </li>
        )),
      ),
    );
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <ul>{movies}</ul>
    </div>
  );
};

export default HomePage;
