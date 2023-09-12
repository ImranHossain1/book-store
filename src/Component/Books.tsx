const Books = () => {
  return (
    <div className="bg-gray-100">
      <h2 className="text-center font-bold text-2xl md:text-5xl pt-6 text-orange-800">
        New Books
      </h2>
      <div className="relative px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-full md:px-10 lg:px-8 lg:py-10">
        <div className="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0"></div>
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-5"></div>
      </div>
    </div>
  );
};

export default Books;
