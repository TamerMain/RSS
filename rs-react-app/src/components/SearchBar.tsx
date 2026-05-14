function SearchBar(props: {
  handleSearchSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  isLoading: boolean;
}) {
  return (
    <>
      <form
        className="flex justify-center gap-1"
        onSubmit={props.handleSearchSubmit}
      >
        <input
          name="search term"
          className="w-full p-2 bg-mist-800 outline-none"
          type="search"
          placeholder="Example: Black Lotus or Lotus"
          value={props.searchValue}
          onChange={props.handleInputChange}
          disabled={props.isLoading}
        ></input>
        <button
          className="p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400"
          type="submit"
          disabled={props.isLoading}
        >
          Find Cards
        </button>
      </form>
    </>
  );
}

export default SearchBar;
