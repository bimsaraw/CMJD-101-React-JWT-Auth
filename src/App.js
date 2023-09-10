import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import ProtectedRoute from './Pages/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            {/* any other route that needs to be protected can be added here */}
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
