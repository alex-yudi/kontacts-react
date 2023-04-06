import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import Main from './pages/main';
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up';

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}


function Router() {

  return (
    <div className="App">

      <Routes>

        <Route path='/login' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route path='/' element={<ProtectedRoutes redirectTo={'/login'} />}>
          <Route path='/' element={<Navigate to='/main' />} />
          <Route path='/main' element={<Main />} />
        </Route>
      </Routes>

    </div>
  )
}

export default Router
