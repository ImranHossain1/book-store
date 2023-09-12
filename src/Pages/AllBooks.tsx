import { useState } from "react";
import BookTable from "../Component/BookTable";
import { useGetBooksQuery } from "../Redux/features/books/bookApi";
import { IBooks } from "../Types/globalType";

const AllBooks = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Inside the AllBooks component
  const filteredBooks = data?.data?.filter((book: IBooks) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const authorMatch = book.author
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const genreMatch = selectedGenre === "" || book.genre === selectedGenre;
    const yearMatch =
      selectedYear === "" || book.publishDate.substring(0, 4) === selectedYear;

    return titleMatch && authorMatch && genreMatch && yearMatch;
  });

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };
  const handleGenreSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedGenre(event.target.value);
  };
  const handleYearSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedYear(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mt-10 w-full">
        <div className="mb-8">
          <h2 className="text-3xl text-center font-bold text-blue-800">
            My Book Store
          </h2>
        </div>
        <div className="w-full px-4 md:flex md:justify-between items-center">
          <div className="p-2 md:p-0 md:w-4/12">
            <input
              type="text"
              placeholder="Search By Name Or Author Or Genre"
              className="input input-bordered input-secondary w-full"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="md:flex items-center">
            <div className="p-2">
              <select
                className="select select-secondary w-full"
                value={selectedYear}
                onChange={handleYearSelectChange}
              >
                <option disabled value="">
                  Any Publication Year
                </option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
              </select>
            </div>
            <div className="p-2">
              <div className="p-2">
                <select
                  className="select select-secondary w-full"
                  value={selectedGenre}
                  onChange={handleGenreSelectChange}
                >
                  <option disabled value="">
                    All Genres
                  </option>
                  <option value="Fiction">Fiction</option>
                  <option value="History">History</option>
                  <option value="Science">Science</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Poem">Poem</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto my-6 mx-2">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Publication Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              {filteredBooks?.map((book: IBooks, index: number) => (
                <BookTable
                  book={book}
                  key={index}
                  index={index + 1}
                ></BookTable>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
