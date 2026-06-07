import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isModalOpen: 'controlled' | 'uncontrolled' | false;
  onCloseModal: () => void;
  children: ReactNode;
};

function Modal(props: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.onCloseModal();
      }
    };

    if (props.isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [props.isModalOpen, props.onCloseModal]);

  if (!props.isModalOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={props.onCloseModal}
    >
      <div
        className="max-w-md w-full mx-4 rounded-lg shadow-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">{props.children}</div>
      </div>
    </div>,
    document.getElementById('modal') || document.body
  );
}

export default Modal;
