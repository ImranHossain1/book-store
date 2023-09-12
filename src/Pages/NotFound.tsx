import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <section className="flex items-center h-screen md:p-16 bg-gray-100 text-red-600">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-5xl md:text-9xl text-black">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-1xl font-semibold md:text-3xl mb-8">
              Sorry, we couldn't find this page.
            </p>
            <Link
              to="/"
              className="md:px-8 md:py-3 p-2 font-semibold rounded bg-red-600 text-white"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
