import { Component } from 'react';
import { searchRequest } from './services/searchRequestApi.tsx';
import type { SearchResponse } from './services/searchRequestApi.tsx';

import CardItem from './components/CardItem.tsx';
import SearchBar from './components/SearchBar.tsx';
import SearchStatusBar from './components/SearchStatusBar.tsx';

type ErrorType = '404' | 'UnknownError' | false;
type State = {
  searchValue: string;
  resultList: SearchResponse | null;
  isError: ErrorType;
  isLoading: boolean;
};

class App extends Component {
  state: State = {
    searchValue: localStorage.getItem('RecentSearch') || '',
    resultList: null,
    isError: false,
    isLoading: false,
  };

  async updateResultList(currentInput: string) {
    this.setState({ isError: false, isLoading: true });

    try {
      const cardList = await searchRequest(currentInput);
      setTimeout(() => {
        this.setState({ resultList: cardList, isLoading: false });
      }, 2000);
    } catch (err) {
      console.log(err);
      if (err instanceof Error && err.message === '404') {
        this.setState({ resultList: null, isError: '404', isLoading: false });
      } else {
        this.setState({
          resultList: null,
          isError: 'UnknownError',
          isLoading: false,
        });
      }
    }
  }

  componentDidMount() {
    const currentInput = this.state.searchValue.trim();
    this.updateResultList(currentInput);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  handleSearchSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentInput = this.state.searchValue.trim();
    currentInput !== localStorage.getItem('RecentSearch') &&
      localStorage.setItem('RecentSearch', currentInput);

    this.updateResultList(currentInput);
  };

  render() {
    return (
      <div className="flex flex-col justify-center gap-3 w-2/4 mx-auto my-5 p-3">
        <SearchBar
          searchValue={this.state.searchValue}
          isLoading={this.state.isLoading}
          handleInputChange={this.handleInputChange}
          handleSearchSubmit={this.handleSearchSubmit}
        />
        <div className="flex flex-col gap-3  border-t-1 border-b-1 border-mist-800">
          <SearchStatusBar
            isLoading={this.state.isLoading}
            isError={this.state.isError}
          />
          <div className="grid grid-cols-4 justify-items-center gap-4 p-2">
            {this.state.resultList &&
              this.state.resultList.data?.map((card) => (
                <CardItem
                  key={card.id}
                  cardImageSrc={
                    card?.image_uris?.normal ||
                    card?.card_faces?.[0]?.image_uris?.normal
                  }
                  cardName={card.name}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
