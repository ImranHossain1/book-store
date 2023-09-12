import { Link } from "react-router-dom";
import { IBooks } from "../Types/globalType";

interface IProps {
  book: IBooks;
}

const Book = ({ book }: IProps) => {
  const { title, author, genre, publishDate, _id } = book;
  return (
    <Link to={`/book-details/${_id}`}>
      <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
        <div className="p-5">
          <p className="mb-2 font-bold">
            {" "}
            <span className="text-blue-800">Title :</span> {title}
          </p>
          <p className="text-sm font-semibold mt-2 leading-5 text-gray-900">
            {" "}
            <span className="text-blue-800">Author : </span>
            {author}
          </p>
          <p className="text-sm font-semibold mt-2 leading-5 text-gray-900">
            {" "}
            <span className="text-blue-800">Genre : </span>
            {genre}
          </p>
          <p className="text-sm font-semibold mt-2 leading-5 text-gray-900">
            {" "}
            <span className="text-blue-800">Publication Date : </span>
            {publishDate}
          </p>
        </div>
        <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
      </div>
    </Link>
  );
};

export default Book;
