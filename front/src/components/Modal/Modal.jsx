import ReactModal from 'react-modal';
import './index.css';

ReactModal.setAppElement('#root');

export const Modal = ({ open, closeModal, children }) => {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={closeModal}
      parentSelector={() => document.getElementById('modal')}
      portalClassName="modal"
      overlayClassName="modal-overlay"
      className="modal-content medium"
      bodyOpenClassName={null}
    >
      {children}
    </ReactModal>
  );
};
