import {
  areTokensValid,
  isRefreshTokenExpired,
} from "../../utils/tokenValidator";

const PageNotFoundErrorView = () => {
  const isLoggedIn = areTokensValid() && !isRefreshTokenExpired();

  return (
    <div>
      <h1>404</h1>
      <p>
        The page you were looking for might have been removed, had it's name
        changed, or is temporarily unavailable
      </p>
      <div>
        {isLoggedIn ? <button>Go to Home</button> : <button>Login</button>}
      </div>
    </div>
  );
};

export default PageNotFoundErrorView;
