import useDocumentTitle from "../hooks/useDocumentTitle";

// TODO: Implement views for both "not found" and "backend unreachable" errors

const ErrorPage = () => {
  useDocumentTitle("Not Found");

  return <div>NotFound</div>;
};

export default ErrorPage;
