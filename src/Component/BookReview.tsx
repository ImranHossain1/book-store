import { ChangeEvent, FormEvent, useState } from "react";

interface IProps {
  id: string | undefined;
}

const BookReview = ({ id }: IProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(id, inputValue);
    //postReview(options);
    setInputValue("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

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
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default BookReview;
