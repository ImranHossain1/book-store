import Navbar from "../Layout/Navbar";
import { useGetWishlistQuery } from "../Redux/features/books/bookApi";
import { useAppSelector } from "../Redux/hook";
import { iWishlist } from "../Types/globalType";

const WishList = () => {
  const { user } = useAppSelector((state) => state.user);
  const {
    data: wishlistData,
    isLoading,
    isError,
  } = useGetWishlistQuery(undefined);

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
  const wishlists = wishlistData?.data.filter(
    (wishlist: iWishlist) => wishlist.userEmail === user.email
  );

  return (
    <>
      <Navbar></Navbar>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center my-8">
          Your Wishlist List
        </h2>
        {wishlists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {wishlists.map((item: iWishlist) => (
              <div
                key={item?._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold">{item?.title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>No items in the wishlist.</p>
        )}
      </div>
    </>
  );
};

export default WishList;
