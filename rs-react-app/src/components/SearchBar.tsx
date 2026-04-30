import { Component } from 'react';

type InputValue = { value: string };

class SearchBar extends Component<Record<string, never>, InputValue> {
  state: InputValue = { value: localStorage.getItem('RecentSearch') || '' };

  handleSearchSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentInput = this.state.value.trim();
    currentInput !== localStorage.getItem('RecentSearch') &&
      localStorage.setItem('RecentSearch', currentInput);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.currentTarget.value });
  };

  render() {
    return (
      <>
        <form
          className="flex justify-center gap-1"
          onSubmit={this.handleSearchSubmit}
        >
          <input
            className="w-full p-2 bg-mist-800 outline-none"
            type="search"
            placeholder="Example: Black Lotus"
            value={this.state.value}
            onChange={this.handleInputChange}
          ></input>
          <button className="p-2 bg-mist-800" type="submit">
            Find Cards
          </button>
        </form>
      </>
    );
  }
}

export default SearchBar;
