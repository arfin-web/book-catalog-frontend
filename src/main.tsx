import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.tsx';
import Books from './pages/Books.tsx';
import Wishlist from './pages/Wishlist.tsx';

import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import BookDetails from './pages/BookDetails.tsx';
import AddBook from './pages/AddBook.tsx';
import ManageBook from './pages/ManageBook.tsx';
import EditBook from './pages/EditBook.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />
      },
      {
        path: "/addbook",
        element: <AddBook />
      },
      {
        path: "/managebook",
        element: <ManageBook />
      },
      {
        path: "/book/:id",
        element: <EditBook />
      },
      {
        path: "/wishlist",
        element: <Wishlist />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-jr003cks0qsytkp1.us.auth0.com"
    clientId="cbPFx1RPcZtX9M9ZnK1l7pFHI6i9BIxx"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Auth0Provider>,
)