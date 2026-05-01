import { Component } from 'react';

class SearchStatusBar extends Component<{
  isLoading: boolean;
  isError: '404' | 'UnknownError' | false;
}> {
  render() {
    return (
      <div className="flex justify-center p-2 ">
        {this.props.isLoading ? (
          <>
            <span className="animate-spin w-5 h-5 text-center">⟡ </span>
            Loading
            <span className="animate-spin w-5 h-5 text-center"> ⟡</span>
          </>
        ) : this.props.isError === '404' ? (
          `No Cards Found With That Name`
        ) : this.props.isError === 'UnknownError' ? (
          'Something Went Wrong'
        ) : (
          'Card List'
        )}
      </div>
    );
  }
}

export default SearchStatusBar;
