import useDocumentTitle from "../hooks/useDocumentTitle";

const NotFound = () => {
  useDocumentTitle("Not Found");

  return <div>NotFound</div>;
};

export default NotFound;
