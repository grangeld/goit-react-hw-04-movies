import { lazy } from 'react';

const HomePage = lazy(() =>
  import('./components/HomePage' /* webpackChunkName: "HomePage" */),
);
const Cast = lazy(() =>
  import('./components/Cast' /* webpackChunkName: "Cast" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
  ),
);
const MoviesPage = lazy(() =>
  import('./components/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const Reviews = lazy(() =>
  import('./components/Reviews' /* webpackChunkName: "Reviews" */),
);

export const routes = [
  {
    path: '/',
    label: 'Home Page',
    component: HomePage,
    exact: true,
    showInMenu: true,
  },
  {
    path: '/movies',
    label: 'Movies Page',
    component: MoviesPage,
    exact: true,
    showInMenu: true,
  },
  {
    path: '/movies/:movieId',
    label: 'Movie Details Page',
    component: MovieDetailsPage,
  },
  {
    path: '/movies/:movieId/cast',
    label: 'Cast',
    component: Cast,
  },
  {
    path: '/movies/:movieId/reviews',
    label: 'Reviews',
    component: Reviews,
  },
];
