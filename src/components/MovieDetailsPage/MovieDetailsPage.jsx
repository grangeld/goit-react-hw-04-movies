import { useState, useEffect, Suspense } from 'react';
import {
  useHistory,
  useLocation,
  useParams,
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {
  getInfoMovieById,
  getActorsListById,
  getReviewsTextById,
} from '../api/api';

const MovieDetailsPage = () => {
  const history = useHistory();
  const location = useLocation();

  // console.log(location?.state?.page);
  const { url } = useRouteMatch();
  const movieId = useParams().movieId;
  // console.log('movieId', movieId);

  const [informationAboutFilm, setInformationAboutFilm] = useState('');
  const [castList, setCastList] = useState('');
  const [reviewsText, setReviewsText] = useState('');

  useEffect(() => {
    // Обновляем заголовок документа с помощью API браузера
    getInfoMovieById(movieId).then(
      ({ backdrop_path, title, vote_average, overview, genres }) => {
        const genresList = genres.reduce(
          (list, { name }) => list + ' ' + name,
          '',
        );
        const img = 'https://image.tmdb.org/t/p/w500' + backdrop_path;
        setInformationAboutFilm({
          img,
          title,
          vote_average,
          overview,
          genresList,
        });
      },
    );
    //{ id, name, profile_path, character}
    getActorsListById(movieId).then(responce => {
      setCastList(
        responce.map(({ id, name, profile_path, character }) => {
          if (profile_path === null) return '';
          return (
            <li key={id}>
              <img
                src={'https://image.tmdb.org/t/p/w200' + profile_path}
                alt={name}
                width="80px"
              />
              <p>{name}</p>
              <p>character: {character}</p>
            </li>
          );
        }),
      );
    });

    getReviewsTextById(movieId).then(response => {
      if (response.length === 0) {
        const errorMassage = (
          <p>
            <b>We dont have any reviews for this movie</b>
          </p>
        );
        setReviewsText(errorMassage);
        return;
      }
      const result = response.map(({ author, content, id }) => {
        return (
          <li key={id}>
            <h2>Author: {author}.</h2>
            <p>{content}</p>
          </li>
        );
      });
      setReviewsText(result);
    });
  }, [movieId]);

  // console.log('useHistory = ', useHistory());
  // console.log('useLocation = ', useLocation());
  // console.log('useParams = ', useParams());

  return (
    <div>
      <button
        type="button"
        onClick={() => history.push(location?.state?.page || '/')}
      >
        Go beack
      </button>

      <img src={informationAboutFilm.img} alt="asd" />
      <h2>{informationAboutFilm.title}</h2>
      <p>vote average: {informationAboutFilm?.vote_average * 10 + '%'}</p>
      <h3>Overview</h3>
      <p>{informationAboutFilm.overview}</p>
      <h3>Genres</h3>
      <p>{informationAboutFilm.genresList}</p>
      <div>
        <p>Additional information</p>
        <ul>
          <li>
            {' '}
            <NavLink to={`${url}/cast`}>Cast</NavLink>
          </li>{' '}
          <li>
            <NavLink to={`${url}/reviews`}>Reviews</NavLink>
          </li>{' '}
        </ul>
      </div>
      <Suspense fallback={<p>Идет загрузка...</p>}>
        <Switch>
          <Route path={`${url}/cast`}>
            <ul>{castList}</ul>
          </Route>
          <Route path={`${url}/reviews`}>{reviewsText}</Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
