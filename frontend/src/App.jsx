import LoginPage from './pages/LoginPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import Root from './routes/Root';
import Home from './pages/Home';
import CustomersPage from './pages/CustomersPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLoggedin, setAuthUser } from './features/userSlice.js'
import axios from 'axios';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("securedToken");
    if (token) {
      let initAuth = async () => {
        try {
          let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          dispatch(setIsLoggedin(true));
          dispatch(setAuthUser(response.data.user))

        } catch (error) {
          console.log(error.message)
        }
      }
      initAuth()


    } else {
      return
    }
  }, [])

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Root />,
        children: [
          {
            path: '/',
            element: <Home />
          },
          {
            path: '/customers',
            element: <CustomersPage />
          }

        ]
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/sign-up',
        element: <SignUpPage />
      },
    ]

  )

  return (
    <RouterProvider router={router} />
  )
}

export default App