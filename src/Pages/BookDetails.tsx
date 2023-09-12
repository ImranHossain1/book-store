import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookReview from "../Component/BookReview";
import {
  useDeleteBookMutation,
  usePostReadingListMutation,
  usePostWishlistMutation,
  useSingleBookQuery,
  useSingleReadimgListQuery,
  useSingleWishlistQuery,
} from "../Redux/features/books/bookApi";
import { useAppSelector } from "../Redux/hook";
import { IBooks } from "../Types/globalType";

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, isLoading } = useSingleBookQuery(id);
  const { user } = useAppSelector((state) => state.user);
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const [wishlistData] = usePostWishlistMutation();
  const [readingListData] = usePostReadingListMutation();
  const { data: wishlist } = useSingleWishlistQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 2000,
  });
  const { data: readingList } = useSingleReadimgListQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 3000,
  });

  const handleAddWishList = (book: IBooks) => {
    const title = book?.title;
    const id = book?._id;
    const options = {
      data: { userEmail: user?.email, bookId: id, title, success: true },
    };
    wishlistData(options);
  };

  const handleAddReadingList = (book: IBooks) => {
    const title = book?.title;
    const id = book?._id;
    const options = {
      data: {
        userEmail: user?.email,
        bookId: id,
        title,
        success: true,
        readingComplete: false,
      },
    };
    readingListData(options);
  };

  // State to handle confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleBookDelete = async (idToDelete: string | undefined) => {
    try {
      await deleteBook(idToDelete);
      // Redirect to the home page or any other desired page after successful deletion
      navigate("/");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  if (!id) {
    navigate("/");
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="my-12 md:w-4/12 mx-auto">
      <h2 className="text-red-600 text-center text-3xl font-bold mb-12">
        Details Of {book?.title}
      </h2>
      <div className="card glass">
        <div className="card-body">
          <h2 className="card-title">{book?.title}</h2>
          <p>Author : {book?.author}</p>
          <p>Genre : {book?.genre}</p>
          <p>Publication Date : {book?.publishDate}</p>
          <div className="card-actions justify-start mt-4">
            <button
              onClick={() => handleAddWishList(book)}
              className={
                wishlist?.success === true
                  ? "btn font-mono bg-red-900 font-normal hover:bg-red-700 btn-sm text-white btn-disabled"
                  : "btn font-mono bg-red-900 font-normal hover:bg-red-700 btn-sm text-white"
              }
            >
              WishList
            </button>
            <button
              onClick={() => handleAddReadingList(book)}
              className={
                readingList?.success === true
                  ? "btn font-mono bg-red-900 font-normal hover:bg-red-700 btn-sm text-white btn-disabled"
                  : "btn font-mono bg-red-900 font-normal hover:bg-red-700 btn-sm text-white"
              }
            >
              Plan to read
            </button>
          </div>
          {user?.email === book?.userEmail && (
            <div className="card-actions justify-start mt-4">
              <Link
                to={`/update-book/${book?._id}`}
                className="btn bg-red-900 font-bold hover:bg-red-700  btn-sm text-white"
              >
                Edit
              </Link>
              <button
                onClick={openDeleteModal}
                className="btn bg-red-900  font-bold hover:bg-red-700 btn-sm text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <BookReview id={id}></BookReview>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* This is the modal */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Confirm Deletion
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this book?
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => {
                    handleBookDelete(id);
                    closeDeleteModal();
                  }}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
