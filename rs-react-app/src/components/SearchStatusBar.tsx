import { Component } from 'react';
import ErrorButton from './ErrorButton';

class SearchStatusBar extends Component<{
  isLoading: boolean;
  isError: '404' | 'UnknownError' | false;
}> {
  render() {
    return (
      <>
        <h1 className="flex justify-center p-2 text-xl">
          {this.props.isLoading ? (
            <>
              <span className="animate-spin w-6 h-6 text-center">⟡ </span>
              Loading
              <span className="animate-spin w-6 h-6 text-center"> ⟡</span>
            </>
          ) : this.props.isError === '404' ? (
            `No Cards Found With That Name`
          ) : this.props.isError === 'UnknownError' ? (
            'Something Went Wrong'
          ) : (
            'Card List'
          )}
        </h1>
        <ErrorButton />
      </>
    );
  }
}

export default SearchStatusBar;
