import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.jsx';
import Menu from './components/Menu.jsx';
import Cart from './components/Cart.jsx';
import { Login } from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Layout from './Layout/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Admin from './components/Admin.jsx';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/cart', element: <Cart /> },
      { path: '/menu', element: <Menu /> },
      { path: '/admin', element: <Admin /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
