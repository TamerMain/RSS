function Page404(props: { isError: '404' | 'UnknownError' | false }) {
  return (
    <h1 className="flex justify-center p-2 text-xl">
      {props.isError === '404' && 'No Cards Found With That Name'}
      {props.isError === 'UnknownError' && 'Something Went Wrong'}
    </h1>
  );
}

export default Page404;
