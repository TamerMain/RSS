import { Component } from 'react';

class SearchBar extends Component<{
  handleSearchSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  isLoading: boolean;
}> {
  render() {
    return (
      <>
        <form
          className="flex justify-center gap-1"
          onSubmit={this.props.handleSearchSubmit}
        >
          <input
            className="w-full p-2 bg-mist-800 outline-none"
            type="search"
            placeholder="Example: Lotus"
            value={this.props.searchValue}
            onChange={this.props.handleInputChange}
            disabled={this.props.isLoading}
          ></input>
          <button
            className="p-2 bg-mist-800"
            type="submit"
            disabled={this.props.isLoading}
          >
            Find Cards
          </button>
        </form>
      </>
    );
  }
}

export default SearchBar;
