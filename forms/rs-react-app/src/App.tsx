import { useState } from 'react';
import UncontrolledForm from '@/components/UncontrolledForm';
import ControlledForm from './components/ControlledForm';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        title="Submit Form"
      >
        {/* <UncontrolledForm /> */}
        <ControlledForm onCloseModal={() => setIsModalOpen(false)} />
      </Modal>
      <button onClick={() => setIsModalOpen(true)}>Open Form</button>
    </>
  );
}

export default App;
