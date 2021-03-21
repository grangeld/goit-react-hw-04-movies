import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from './components/Container';
import AppBar from './components/AppBar';
// import HomePage from './components/HomePage';
// import MoviePage from './components/MoviesPage';
// import MovieDetailsPage from './components/MovieDetailsPage';
// import NotFoundView from './pages/NotFoundView';

const HomePage = lazy(() =>
  import('./components/HomePage' /* webpackChunkName: "HomePage" */),
);

const MoviePage = lazy(() =>
  import('./components/MoviesPage' /* webpackChunkName: "MoviePage" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
  ),
);

const NotFoundView = lazy(() =>
  import('./pages/NotFoundView' /* webpackChunkName: "NotFoundView" */),
);

function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<h1>Идет загрузка...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviePage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
