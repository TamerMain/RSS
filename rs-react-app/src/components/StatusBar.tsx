function StatusBar(props: {
  isLoading: boolean;
  isError: '404' | 'UnknownError' | false;
}) {
  return (
    <>
      <h1 className="flex justify-center p-2 text-xl">
        {props.isLoading ? (
          <>
            <span className="animate-spin w-6 h-6 text-center">⟡ </span>
            Loading
            <span className="animate-spin w-6 h-6 text-center"> ⟡</span>
          </>
        ) : props.isError === '404' ? (
          `No Cards Found With That Name`
        ) : props.isError === 'UnknownError' ? (
          'Something Went Wrong'
        ) : (
          'Card List'
        )}
      </h1>
    </>
  );
}

export default StatusBar;
