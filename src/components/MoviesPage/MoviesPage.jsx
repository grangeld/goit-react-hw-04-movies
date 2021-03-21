import { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { searchMovieByName } from '../api/api';
const MovieDetailsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [moviesList, setMoviesList] = useState('');

  const history = useHistory();
  const location = useLocation();
  const searchOrder = new URLSearchParams(location.search).get('query');
  const searchMovie = event => {
    event.preventDefault();
    history.push({ ...location, search: `query=${searchValue}` });
  };

  useEffect(() => {
    if (searchOrder === null) return;

    searchMovieByName(searchOrder).then(response => {
      setMoviesList(
        response.map(({ title, id }) => (
          <li key={id}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: { page: `/movies${location.search}` },
              }}
            >
              {title}
            </Link>
          </li>
        )),
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOrder]);

  return (
    <div>
      <form onSubmit={searchMovie}>
        <label>
          <input
            type="text"
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
          />
        </label>
        <input type="submit" value="search" />
      </form>
      {{ moviesList } && <ul>{moviesList}</ul>}
    </div>
  );
};
export default MovieDetailsPage;
