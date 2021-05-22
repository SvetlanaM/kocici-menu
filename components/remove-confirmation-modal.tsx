import Modal from 'react-modal';
import SubmitButton from './submit-button';
import NeutralButton from './neutral-button';
import router from 'next/router';

interface RemoveConfirmationModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onClickAction: () => Promise<boolean>;
  rest: any;
}

const RemoveConfirmationModal = ({
  isOpen,
  closeModal,
  rest,
  onClickAction,
}: RemoveConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add product review"
      className="w-2/4 pt-9 pb-7 px-10 m-auto bg-white border-rounded-base center-modal"
    >
      <div className="flex flex-col justify-between text-purple leading-normal">
        <h2 className="font-medium text-2xl">
          Potvrdit vymazanie mačky {rest}
        </h2>
        <div className="flex justify-between items-center pt-4">
          <div className="font-light text-sm w-full pr-3.6">
            Naozaj chcete vymazat macku {rest}? Vymazanie je trvale a nie je
            mozne ho vratit spet.
          </div>
        </div>
        <div className="flex justify-between flex-row pt-1">
          <NeutralButton title="Spet" onClick={closeModal} />
          <SubmitButton
            text="Vymazat"
            size="w-1/4"
            color="bg-red-500"
            onClick={onClickAction}
          />
        </div>
      </div>
    </Modal>
  );
};

export default RemoveConfirmationModal;
