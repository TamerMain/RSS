import { useState } from 'react';
import Modal from './components/Modal';
import UncontrolledForm from '@/components/UncontrolledForm';
import ControlledForm from './components/ControlledForm';
import EntriesList from './components/EntriesList';

function App() {
  const [isModalOpen, setIsModalOpen] = useState<
    'controlled' | 'uncontrolled' | false
  >(false);
  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
      >
        {isModalOpen === 'uncontrolled' && (
          <UncontrolledForm onCloseModal={() => setIsModalOpen(false)} />
        )}
        {isModalOpen === 'controlled' && (
          <ControlledForm onCloseModal={() => setIsModalOpen(false)} />
        )}
      </Modal>

      <div className="absolute flex flex-col items-center top-25 left-1/2 -translate-x-1/2 w-[75vw] ">
        <div className="relative w-[50vw] h-35">
          <button
            onClick={() => setIsModalOpen('uncontrolled')}
            tabIndex={isModalOpen ? -1 : 0}
            className={`absolute h-35 ${isModalOpen === 'uncontrolled' ? 'w-4/5 z-10' : 'w-2/4'} hover:w-4/5 hover:z-10 text-5xl  text-center rounded-l-lg bg-emerald-200 text-bitcount transition-all overflow-hidden`}
          >
            Uncontrolled Form
          </button>
          <button
            tabIndex={isModalOpen ? -1 : 0}
            onClick={() => setIsModalOpen('controlled')}
            className={`absolute right-0 h-35 ${isModalOpen === 'controlled' ? 'w-4/5 z-10' : 'w-2/4'}  hover:w-4/5  text-5xl text-center rounded-r-lg bg-purple-200 text-bitcount transition-all overflow-hidden`}
          >
            Controlled Form
          </button>
        </div>
        <EntriesList />
      </div>
    </>
  );
}

export default App;
