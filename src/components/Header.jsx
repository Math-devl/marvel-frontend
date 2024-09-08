import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <Link to="/">
            <img
              className="header-logo"
              src="src/assets/Marvel-logo.png"
              alt="marvel-logo"
            />
          </Link>
        </div>
        <div className="header-button">
          <Link to="/characters">
            <button>Characters</button>
          </Link>
          <Link to="/comics">
            <button>Comics</button>
          </Link>
          <Link to="/favoris">
            <button>Fav</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
