import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import {ProtectedRoute} from './components/ProtectedRoute'
import Register from './components/Register'
import {AuthProvider} from './context/authContext'

function App() {
  return (
    <div className="bg-slate-900 h-screen text-white flex">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
            />
          <Route 
            path="/login" 
            element={
              <Login />
            }
          />
          <Route
            path="/register"
            element={
              <Register />
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
