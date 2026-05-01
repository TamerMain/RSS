import { Component } from 'react';

type State = { isUnexpectedError: boolean };

class ErrorButton extends Component<Record<string, never>, State> {
  state: State = { isUnexpectedError: false };

  render() {
    if (this.state.isUnexpectedError) {
      throw new Error('Unexpected Error');
    }
    return (
      <button
        className="absolute -right-40 top-21 p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer max-w-30"
        onClick={() => this.setState({ isUnexpectedError: true })}
      >
        Emulate Unexpected Error
      </button>
    );
  }
}

export default ErrorButton;
