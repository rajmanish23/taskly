import { useNavigate } from "react-router-dom";

import {
  areTokensValid,
  isRefreshTokenExpired,
} from "../../utils/tokenValidator";
import {
  SC_BackgroundContainer,
  SC_PageErrorImage,
  SC_PageRedirectButton,
  SC_ServerErrorImage,
  SC_SideContainer,
  SC_SideText,
} from "./styles";
import serverUnreachable from "../../assets/server-unreachable.png";
import { LOGIN_PAGE_URL, TODAY_PAGE_URL } from "../../constants";

type Props = {
  errorMode: "NOT_FOUND" | "SERVER_UNREACHABLE";
};

const RouteServerErrorView = ({ errorMode }: Props) => {
  const navigate = useNavigate();

  const isLoggedIn = areTokensValid() && !isRefreshTokenExpired();

  return (
    <SC_BackgroundContainer>
      {errorMode === "NOT_FOUND" ? (
        <SC_PageErrorImage>404</SC_PageErrorImage>
      ) : (
        <SC_ServerErrorImage src={serverUnreachable} alt="Server Unreachable" />
      )}
      <SC_SideContainer>
        <SC_SideText>
          {errorMode === "NOT_FOUND"
            ? "The page you were looking for might have been removed, had it's name changed, or is temporarily unavailable"
            : "It looks like we cannot reach our servers at the moment. Please try again later."}
        </SC_SideText>
        {errorMode === "NOT_FOUND" ? (
          isLoggedIn ? (
            <SC_PageRedirectButton onClick={() => navigate(TODAY_PAGE_URL)}>
              Go to Home
            </SC_PageRedirectButton>
          ) : (
            <SC_PageRedirectButton onClick={() => navigate(LOGIN_PAGE_URL)}>
              Login
            </SC_PageRedirectButton>
          )
        ) : (
          <></>
        )}
      </SC_SideContainer>
    </SC_BackgroundContainer>
  );
};

export default RouteServerErrorView;
