import { useState } from 'react';
import Modal from './components/Modal';
import UncontrolledForm from '@/components/UncontrolledForm';
import ControlledForm from './components/ControlledForm';
import EntriesList from './components/EntriesList';
import { MODAL_TYPES } from './constants/modal';
import { type ModalType } from './components/types/types';

function App() {
  const [isModalOpen, setIsModalOpen] = useState<ModalType | false>(false);
  return (
    <>
      <div
        data-testid="app"
        className="absolute flex flex-col items-center top-25 left-1/2 -translate-x-1/2 w-[75vw] "
      >
        <Modal
          isModalOpen={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
        >
          {isModalOpen === MODAL_TYPES.UNCONTROLLED && (
            <UncontrolledForm onModalClose={() => setIsModalOpen(false)} />
          )}
          {isModalOpen === MODAL_TYPES.CONTROLLED && (
            <ControlledForm onModalClose={() => setIsModalOpen(false)} />
          )}
        </Modal>
        <div className="relative w-[50vw] h-35">
          <button
            onClick={() => setIsModalOpen(MODAL_TYPES.UNCONTROLLED)}
            tabIndex={isModalOpen ? -1 : 0}
            className={`absolute h-35 ${isModalOpen === MODAL_TYPES.UNCONTROLLED ? 'w-4/5 z-10' : 'w-2/4'} hover:w-4/5 hover:z-10 text-5xl  text-center rounded-l-lg bg-emerald-200 text-bitcount transition-all overflow-hidden`}
          >
            Uncontrolled Form
          </button>
          <button
            tabIndex={isModalOpen ? -1 : 0}
            onClick={() => setIsModalOpen(MODAL_TYPES.CONTROLLED)}
            className={`absolute right-0 h-35 ${isModalOpen === MODAL_TYPES.CONTROLLED ? 'w-4/5 z-10' : 'w-2/4'}  hover:w-4/5  text-5xl text-center rounded-r-lg bg-purple-200 text-bitcount transition-all overflow-hidden`}
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
