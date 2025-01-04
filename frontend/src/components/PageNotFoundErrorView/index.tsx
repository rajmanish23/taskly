import {
  areTokensValid,
  isRefreshTokenExpired,
} from "../../utils/tokenValidator";
import { SC_BackgroundContainer } from "./styles";
import serverUnreachable from "../../assets/server-unreachable.png";

type Props = {
  errorMode: "NOT_FOUND" | "SERVER_UNREACHABLE";
};

const RouteServerErrorView = ({ errorMode }: Props) => {
  const isLoggedIn = areTokensValid() && !isRefreshTokenExpired();

  return (
    <SC_BackgroundContainer>
      {errorMode === "NOT_FOUND" ? (
        <h1>404</h1>
      ) : (
        <img src={serverUnreachable} alt="Server Unreachable" />
      )}
      <p>
        The page you were looking for might have been removed, had it's name
        changed, or is temporarily unavailable
      </p>
      <div>
        {isLoggedIn ? <button>Go to Home</button> : <button>Login</button>}
      </div>
    </SC_BackgroundContainer>
  );
};

export default RouteServerErrorView;
