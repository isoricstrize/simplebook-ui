import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <div id="main">
        <div className="home-content">
          <h1>Welcome to the Book Library</h1>
          <p>
            Discover and explore our collection of books. Browse titles,
            authors, and genres, and find your next favorite read.
          </p>
          <Link to="/books" className="home-btn">
            Explore Books
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
