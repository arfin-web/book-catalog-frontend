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
import Contact from './pages/Contact.tsx';

import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import BookDetails from './pages/BookDetails.tsx';

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
        path: "books/:id",
        element: <BookDetails />
      },
      {
        path: "/wishlist",
        element: <Wishlist />
      },
      {
        path: "/contact",
        element: <Contact />
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