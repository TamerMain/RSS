import { useState } from 'react';

function ErrorButton() {
  const [isUnexpectedError, setIsUnexpectedError] = useState<boolean>(false);

  if (isUnexpectedError) {
    throw new Error('Unexpected Error');
  }

  return (
    <button
      className="p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer max-w-30 transition-colors duration-400"
      onClick={() => setIsUnexpectedError(true)}
    >
      Emulate Unexpected Error
    </button>
  );
}

export default ErrorButton;
