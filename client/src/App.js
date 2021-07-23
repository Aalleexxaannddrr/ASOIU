import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes';
// import { useReady } from './hooks/ready.hook';
import { Navbar } from './components/Navbar';
// import { Loader } from './components/Loader'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import 'materialize-css'

function App() {
  const {token, login, logout, userId, isOrganizer} = useAuth()
  const isAuthenticated = !!token
  // const { ready } = useReady()
  const routes = useRoutes(isAuthenticated, isOrganizer)

  // if (!ready) {
  //   return <Loader />
  // }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isOrganizer, isAuthenticated
    }}>
      <Router>
        <Navbar />
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;