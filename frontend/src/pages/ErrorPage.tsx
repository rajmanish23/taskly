import RouteServerErrorView from "../components/PageNotFoundErrorView";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { SC_MainViewContainer } from "./styles";

type Props = {
  errorMode: "NOT_FOUND" | "SERVER_UNREACHABLE";
};

const ErrorPage = ({ errorMode }: Props) => {
  useDocumentTitle("Not Found");

  return (
    <SC_MainViewContainer>
      <RouteServerErrorView errorMode={errorMode} />
    </SC_MainViewContainer>
  );
};

export default ErrorPage;
