import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { GlobalStyle } from './styles/global';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes >
    </Router>
  );
}

export default App;
