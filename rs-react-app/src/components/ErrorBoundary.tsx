import { Component, type ErrorInfo } from 'react';

type State = { isError: boolean };
type Props = { children?: React.ReactNode };

class ErrorBoundary extends Component<Props, State> {
  state: State = { isError: false };

  static getDerivedStateFromError(): State {
    return { isError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Uncaught error', error, errorInfo);
  }

  render() {
    if (this.state.isError) {
      return (
        <div className="flex flex-col justify-center gap-3 w-2/4 mx-auto my-5 p-3 text-center">
          <h1 className=" p-2 text-xl bg-mist-800 ">
            Unexpected Error.
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
