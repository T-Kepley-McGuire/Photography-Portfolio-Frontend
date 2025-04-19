import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center content-evenly ">
      <h1 className="text-xl text-center mb-[20px]">Error 404</h1>
      <h2 className="text-lg text-center mb-[20px]">This is not the page you're looking for</h2>
      <Link to="/" className="cursor w-fit p-2 text-center rounded-lg bg-gray-200">Return Home</Link>
    </div>
  );
}

export default NotFound;
