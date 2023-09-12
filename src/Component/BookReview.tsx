import { ChangeEvent, FormEvent, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import {
  useGetReviewQuery,
  usePostReviewMutation,
} from "../Redux/features/books/bookApi";

interface IProps {
  id: string | undefined;
}

const BookReview = ({ id }: IProps) => {
  const { data, isLoading } = useGetReviewQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 3000,
  });

  const [inputValue, setInputValue] = useState<string>("");
  const [postReview] = usePostReviewMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      id: id,
      data: { review: inputValue },
    };
    postReview(options);
    setInputValue("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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
    <div className="my-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-1 sm:mb-2 flex w-full rounded-xl border-2">
          <input
            onChange={handleChange}
            placeholder="Write Your Review"
            required
            type="text"
            className="input w-full"
            name="review"
          />
          <button type="submit" className="uppercase btn btn-active">
            Add Comment
          </button>
        </div>
      </form>
      <div className="overflow-x-auto my-8">
        <table className="table">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {data?.review?.map((r: string, index: number) => (
              <tr key={index}>
                <td>
                  <FaUserAlt size={22}></FaUserAlt>
                </td>
                <td className="font-bold text-1xl">{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookReview;
