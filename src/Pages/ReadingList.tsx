import Navbar from "../Layout/Navbar";
import {
  useGetReadingListQuery,
  useUpdateReadingListMutation,
} from "../Redux/features/books/bookApi";
import { useAppSelector } from "../Redux/hook";
import { iReadingList } from "../Types/globalType";

const ReadingList = () => {
  const { user } = useAppSelector((state) => state.user);
  const {
    data: readingListData,
    isLoading,
    isError,
  } = useGetReadingListQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 3000,
  });

  const [readinglistUpdate] = useUpdateReadingListMutation();

  const handleSubmit = (id: string | undefined) => {
    const options = {
      id: id,
      data: { readingComplete: true },
    };
    readinglistUpdate(options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error fetching wishlist data. Please try again later.
      </div>
    );
  }

  // Check if data is an array before filtering
  const readingLists = readingListData?.data.filter(
    (readingList: iReadingList) => readingList.userEmail === user.email
  );
  return (
    <>
      <Navbar></Navbar>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center my-8">
          Your Reading List Data
        </h2>
        {readingLists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {readingLists.map((item: iReadingList) => (
              <div
                key={item?._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold">{item?.title}</h3>
                <p className="item-center mt-2">
                  Reading Status:
                  {item?.readingComplete === false ? (
                    <>
                      <input
                        onBlur={() => handleSubmit(item?._id)}
                        className="ms-2"
                        type="checkbox"
                        name=""
                      />
                      <span className="ms-2">Complete</span>
                    </>
                  ) : (
                    <span className="ms-2">Finished</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No items in the Reading List.</p>
        )}
      </div>
    </>
  );
};

export default ReadingList;
