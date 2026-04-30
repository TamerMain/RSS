import { Component } from 'react';
import CardItem from './components/CardItem.tsx';
import SearchBar from './components/SearchBar.tsx';

const itemsNumber = 9;

class App extends Component {
  render() {
    return (
      <div className="flex flex-col justify-center gap-3 w-2/4 mx-auto my-5 p-3">
        <SearchBar />
        <div className="flex flex-col gap-3  border-t-1 border-b-1 border-mist-800">
          <div className="flex justify-center p-2 ">Cards Found</div>
          <div className="grid grid-cols-4 justify-items-center gap-4 p-2">
            {Array.from({ length: itemsNumber }).map((_, index) => (
              <CardItem index={index}></CardItem>
            ))}
          </div>
        </div>
        <button className="self-end p-2 bg-mist-800">Error Button</button>
      </div>
    );
  }
}

export default App;
