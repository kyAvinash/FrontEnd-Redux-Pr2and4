import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import MovieView from "./features/movie/MovieView";
import MovieForm from "./features/movie/MovieForm";

function App() {
  return (
    <>
      <Router>
        <header className="bg-light py-3 shadow-sm">
          <div className="container d-flex justify-content-between align-items-center">
            <h1 className="m-0">🎬 Movie List</h1>
            <nav>
              <ul className="nav">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link text-dark"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? "bold" : "normal",
                    })}
                  >
                    Movie List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/addMovie"
                    className="nav-link text-dark"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? "bold" : "normal",
                    })}
                  >
                    Add New Movie
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<MovieView />} />
            <Route path="/addMovie" element={<MovieForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
