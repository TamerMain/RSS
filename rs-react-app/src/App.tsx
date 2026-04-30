import { Component } from 'react';
import { searchRequest } from './services/searchRequestApi.tsx';
import type { SearchResponse } from './services/searchRequestApi.tsx';

import CardItem from './components/CardItem.tsx';
import SearchBar from './components/SearchBar.tsx';

type State = { searchValue: string; cardList: SearchResponse | null };

class App extends Component {
  state: State = {
    searchValue: localStorage.getItem('RecentSearch') || '',
    cardList: null,
  };

  async componentDidMount(): Promise<void> {
    const cardList = await searchRequest(this.state.searchValue.trim());
    this.setState({ cardList: cardList });
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  handleSearchSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentInput = this.state.searchValue.trim();
    currentInput !== localStorage.getItem('RecentSearch') &&
      localStorage.setItem('RecentSearch', currentInput);

    const cardList = await searchRequest(currentInput);
    this.setState({ cardList: cardList });
  };

  render() {
    return (
      <div className="flex flex-col justify-center gap-3 w-2/4 mx-auto my-5 p-3">
        <SearchBar
          searchValue={this.state.searchValue}
          handleInputChange={this.handleInputChange}
          handleSearchSubmit={this.handleSearchSubmit}
        />
        <div className="flex flex-col gap-3  border-t-1 border-b-1 border-mist-800">
          <div className="flex justify-center p-2 ">Cards Found</div>
          <div className="grid grid-cols-4 justify-items-center gap-4 p-2">
            {this.state.cardList &&
              this.state.cardList.data?.map((card) => (
                <CardItem
                  key={card.id}
                  cardImageSrc={card?.image_uris?.normal}
                  cardName={card.name}
                ></CardItem>
              ))}
          </div>
        </div>
        <button className="self-end p-2 bg-mist-800">Error Button</button>
      </div>
    );
  }
}

export default App;
